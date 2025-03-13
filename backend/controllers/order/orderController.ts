import moment from "moment";
import customerOrder from "../../models/customerOrderModel";
import authOrderModel from "../../models/authOrderModel";
import cardModel from "../../models/cardModel";
import { responseReturn } from "../../utils/response";
import customerOrderModel from "../../models/customerOrderModel";
import mongoose, { ObjectId } from "mongoose";

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
        const orders = await authOrderModel
          .find({
            sellerId,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalOrder = await authOrderModel
          .find({
            sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  getSellerOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await authOrderModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };

  sellerOrderStatusUpdate = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await authOrderModel.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });
      responseReturn(res, 200, { message: "order status changed" });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "error" });
    }
  };
}

export default new orderController();
