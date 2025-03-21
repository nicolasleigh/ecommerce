import moment from "moment";
import customerOrder from "../../models/customerOrderModel";
import authOrderModel from "../../models/authOrderModel";
import cardModel from "../../models/cardModel";
import { responseReturn } from "../../utils/response";
import customerOrderModel from "../../models/customerOrderModel";
import mongoose, { ObjectId } from "mongoose";
import productModel from "../../models/productModel";
import customerModel from "../../models/customerModel";

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);
      if (order?.paymentStatus === "unpaid") {
        await customerOrder.findByIdAndUpdate(id, {
          deliveryStatus: "cancelled",
        });
        await authOrderModel.updateMany(
          {
            orderId: id,
          },
          {
            deliveryStatus: "cancelled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };
  placeOrder = async (req, res) => {
    const { price, products, shippingFee, shippingInfo, userId } = req.body;
    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");

    let customerOrderProduct = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        const tempCusPro = pro[j].productInfo;
        tempCusPro.quantity = pro[j].quantity;
        customerOrderProduct.push(tempCusPro);
        if (pro[j]._id) {
          cardId.push(pro[j]._id);
        }
      }
    }

    try {
      const order = await customerOrder.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProduct,
        price: price + shippingFee,
        paymentStatus: "unpaid",
        deliveryStatus: "pending",
        date: tempDate,
      });
      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          const tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }
        authorOrderData.push({
          orderId: order.id,
          sellerId,
          products: storePro,
          price: pri,
          paymentStatus: "unpaid",
          shippingInfo: "Easy Main Warehouse",
          deliveryStatus: "pending",
          date: tempDate,
        });
      }
      await authOrderModel.insertMany(authorOrderData);
      for (let i = 0; i < cardId.length; i++) {
        await cardModel.findByIdAndDelete(cardId[i]);
      }

      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 15000);

      responseReturn(res, 200, { orderId: order.id, message: "Order placed successfully" });
    } catch (error) {
      console.log(error.message);
    }
  };

  getCustomerDashboardData = async (req, res) => {
    const { userId } = req.params;

    try {
      const recentOrders = await customerOrderModel
        .find({
          customerId: mongoose.Types.ObjectId.createFromHexString(userId),
        })
        .limit(5);
      const pendingOrder = await customerOrderModel
        .find({
          customerId: mongoose.Types.ObjectId.createFromHexString(userId),
          deliveryStatus: "pending",
        })
        .countDocuments();
      const totalOrder = await customerOrderModel
        .find({
          customerId: mongoose.Types.ObjectId.createFromHexString(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrderModel
        .find({
          customerId: mongoose.Types.ObjectId.createFromHexString(userId),
          deliveryStatus: "cancelled",
        })
        .countDocuments();

      responseReturn(res, 200, { recentOrders, pendingOrder, totalOrder, cancelledOrder });
    } catch (error) {
      console.log(error.message);
    }
  };

  getOrders = async (req, res) => {
    const { customerId, status } = req.params;

    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrderModel.find({
          customerId: mongoose.Types.ObjectId.createFromHexString(customerId),
          deliveryStatus: status,
        });
      } else {
        orders = await customerOrderModel.find({
          customerId: mongoose.Types.ObjectId.createFromHexString(customerId),
        });
      }
      responseReturn(res, 200, { orders });
    } catch (error) {
      console.log(error.message);
    }
  };

  getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error.message);
    }
  };

  getAdminOrders = async (req, res) => {
    let { page, searchValue, perPage } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await customerOrderModel
          .aggregate([
            {
              $lookup: {
                from: "authororders",
                localField: "_id",
                foreignField: "orderId",
                as: "suborder",
              },
            },
          ])
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalOrder = await customerOrderModel.aggregate([
          {
            $lookup: {
              from: "authororders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ]);

        responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAdminOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrder.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authororders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log(error);
    }
  };

  adminOrderStatusUpdate = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });
      responseReturn(res, 200, { message: "order status changed" });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getSellerOrders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, searchValue, perPage } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);
    const skipPage = perPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await customerOrderModel
          .find({
            // sellerId,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalOrder = await customerOrderModel
          .find({
            // sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getLatestOrders = async (req, res) => {
    const { limit } = req.params;
    try {
      const orders = await customerOrderModel.find({}).sort({ createdAt: -1 }).limit(limit);
      responseReturn(res, 200, { latestOrders: orders });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getAllOrders = async (req, res) => {
    try {
      const allOrders = await customerOrderModel.find({}).sort({ createdAt: -1 });
      responseReturn(res, 200, { orders: allOrders });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getSellerOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrderModel.findById(orderId);
      // console.log(order);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getPaymentStats = async (req, res) => {
    try {
      const unpaidAmount = await customerOrderModel.find(
        {
          paymentStatus: "unpaid",
        },
        { price: 1, _id: 0 }
      );
      const paidAmount = await customerOrderModel.find(
        {
          paymentStatus: "paid",
        },
        { price: 1, _id: 0 }
      );
      const refundAmount = await customerOrderModel.find(
        {
          paymentStatus: "refund",
        },
        { price: 1, _id: 0 }
      );
      const paidCount = await customerOrderModel.countDocuments({
        paymentStatus: "paid",
      });
      const refundCount = await customerOrderModel.countDocuments({
        paymentStatus: "refund",
      });
      const unpaidStats = unpaidAmount.reduce((acc, cur) => cur.price + acc, 0);
      const paidStats = paidAmount.reduce((acc, cur) => cur.price + acc, 0);
      const refundStats = refundAmount.reduce((acc, cur) => cur.price + acc, 0);
      const refundRate = Math.round((refundCount / paidCount) * 100);
      responseReturn(res, 200, { unpaidStats, paidStats, refundStats, refundRate });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getDashboardStats = async (req, res) => {
    try {
      const unpaidAmount = await customerOrderModel.find(
        {
          paymentStatus: "unpaid",
        },
        { price: 1, _id: 0 }
      );
      const paidAmount = await customerOrderModel.find(
        {
          paymentStatus: "paid",
        },
        { price: 1, _id: 0 }
      );
      const productCount = await productModel.countDocuments({});
      const customerCount = await customerModel.countDocuments({});
      const orderCount = await authOrderModel.countDocuments({});
      // console.log(productCount, customerCount, orderCount);

      const unpaidStats = unpaidAmount.reduce((acc, cur) => cur.price + acc, 0);
      const paidStats = paidAmount.reduce((acc, cur) => cur.price + acc, 0);

      responseReturn(res, 200, { unpaidStats, paidStats, productCount, customerCount, orderCount });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  sellerOrderStatusUpdate = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    // console.log(orderId);

    try {
      await customerOrderModel.findByIdAndUpdate(orderId, {
        paymentStatus: status,
      });
      responseReturn(res, 200, { message: "order status changed" });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };
}

export default new orderController();
