import mongoose, { mongo } from "mongoose";
import cartModel from "../../models/cartModel";
import { responseReturn } from "../../utils/response";
import wishlistModel from "../../models/wishlistModel";

class cartController {
  addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const product = await cartModel.findOne({
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
        const product = await cartModel.create({
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

  getCartProducts = async (req, res) => {
    // const commission = 5;
    const commission = 0;
    const { userId } = req.params;
    try {
      const cartProducts = await cartModel.aggregate([
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
      let cartProductCount = 0;
      const outOfStockProducts = cartProducts.filter((p) => p.products[0].stock < p.quantity);
      for (let i = 0; i < outOfStockProducts.length; i++) {
        cartProductCount = cartProductCount + outOfStockProducts[i].quantity;
      }

      const stockProduct = cartProducts.filter((p) => p.products[0].stock >= p.quantity);
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        cartProductCount = buyProductItem + quantity;
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
              price,
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
        cartProducts: p,
        price: calculatePrice,
        cartProductCount,
        // shippingFee: 20 * p.length,
        shippingFee: 0,
        outOfStockProducts,
        buyProductItem,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteCartProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await cartModel.findByIdAndDelete(id);
      responseReturn(res, 200, { message: "Product removed successfully" });
    } catch (error) {
      console.log(error.message);
    }
  };

  quantityIncrement = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await cartModel.findById(id);
      const { quantity } = product;
      await cartModel.findByIdAndUpdate(id, { quantity: quantity + 1 });
      responseReturn(res, 200, { message: "Quantity updated" });
    } catch (error) {
      console.log(error.message);
    }
  };

  quantityDecrement = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await cartModel.findById(id);
      const { quantity } = product;
      await cartModel.findByIdAndUpdate(id, { quantity: quantity - 1 });
      responseReturn(res, 200, { message: "Quantity updated" });
    } catch (error) {
      console.log(error.message);
    }
  };

  addWishlist = async (req, res) => {
    const { slug } = req.body;

    try {
      const product = await wishlistModel.findOne({ slug });
      if (product) {
        responseReturn(res, 404, { error: "Product is already in wishlist" });
      } else {
        await wishlistModel.create(req.body);
        responseReturn(res, 201, { message: "Product added to wishlist" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getWishlist = async (req, res) => {
    const { userId } = req.params;
    try {
      const wishlists = await wishlistModel.find({ userId });
      responseReturn(res, 200, { wishlistCount: wishlists.length, wishlists });
    } catch (error) {
      console.log(error.message);
    }
  };

  removeWishlist = async (req, res) => {
    const { wishlistId } = req.params;

    try {
      const wishlist = await wishlistModel.findByIdAndDelete(wishlistId);
      responseReturn(res, 200, { wishlistId, message: "Wishlist product removed" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new cartController();
