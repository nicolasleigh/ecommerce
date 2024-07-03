import mongoose, { mongo } from "mongoose";
import cardModel from "../../models/cardModel";
import { responseReturn } from "../../utils/response";

class cardController {
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });

      if (product) {
        responseReturn(res, 404, { error: "Product already added to cart" });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, { product, message: "Product added successfully" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getCardProducts = async (req, res) => {
    const commission = 5;
    const { userId } = req.params;
    try {
      const cardProducts = await cardModel.aggregate([
        {
          $match: {
            userId: {
              $eq: mongoose.Types.ObjectId.createFromHexString(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let buyProductItem = 0;
      let calculatePrice = 0;
      let cardProductCount = 0;
      const outOfStockProducts = cardProducts.filter((p) => p.products[0].stock < p.quantity);
      for (let i = 0; i < outOfStockProducts.length; i++) {
        cardProductCount = cardProductCount + outOfStockProducts[i].quantity;
      }

      const stockProduct = cardProducts.filter((p) => p.products[0].stock >= p.quantity);
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        cardProductCount = buyProductItem + quantity;
        buyProductItem = buyProductItem + quantity;
        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      }
      let p = [];
      let unique = [...new Set(stockProduct.map((p) => p.products[0].sellerId.toString()))];
      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0];
          if (unique[i] === tempProduct.sellerId.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri = tempProduct.price - Math.floor(tempProduct.price * tempProduct.discount) / 100;
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * commission) / 100);
            price = price + pri * stockProduct[j].quantity;
            p[i] = {
              sellerId: unique[i],
              shopName: tempProduct.shopName,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: stockProduct[j]._id,
                      quantity: stockProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }
      responseReturn(res, 200, {
        cardProducts: p,
        price: calculatePrice,
        cardProductCount,
        shippingFee: 20 * p.length,
        outOfStockProducts,
        buyProductItem,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new cardController();
