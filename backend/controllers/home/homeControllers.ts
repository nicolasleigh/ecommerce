import categoryModel from "../../models/categoryModel";
import productModel from "../../models/productModel";
import { responseReturn } from "../../utils/response";
import queryProducts from "../../utils/queryProducts";
import reviewModel from "../../models/reviewModel";
import moment from "moment";
import mongoose from "mongoose";

class homeControllers {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  getCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      responseReturn(res, 200, {
        categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await productModel.find({}).limit(12).sort({ createdAt: -1 });
      const allProduct1 = await productModel.find({}).limit(9).sort({ createdAt: -1 });
      const latestProduct = this.formateProduct(allProduct1);
      const allProduct2 = await productModel.find({}).limit(9).sort({ rating: -1 });
      const topRatedProduct = this.formateProduct(allProduct2);
      const allProduct3 = await productModel.find({}).limit(9).sort({ discount: -1 });
      const discountProduct = this.formateProduct(allProduct3);

      responseReturn(res, 200, { products, latestProduct, topRatedProduct, discountProduct });
    } catch (error) {
      console.log(error.message);
    }
  };

  priceRangeProduct = async (req, res) => {
    try {
      const priceRange = {
        low: 0,
        high: 0,
      };
      const products = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });
      const latestProduct = this.formateProduct(products);
      const getForPrice = await productModel.find({}).sort({ price: 1 });
      if (getForPrice.length) {
        priceRange.high = getForPrice[getForPrice.length - 1].price;
        priceRange.low = getForPrice[0].price;
      }
      responseReturn(res, 200, {
        latestProduct,
        priceRange,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  queryProducts = async (req, res) => {
    const perPage = 12;
    req.query.perPage = perPage;

    try {
      const products = await productModel.find({}).sort({ createdAt: -1 });
      const totalProduct = new queryProducts(products, req.query)
        .categoryQuery()
        .ratingQuery()
        .priceQuery()
        .searchQuery()
        .sortByPrice()
        .countProducts();
      const result = new queryProducts(products, req.query)
        .categoryQuery()
        .ratingQuery()
        .priceQuery()
        .searchQuery()
        .sortByPrice()
        .skip()
        .limit()
        .getProducts();

      // console.log(result);
      responseReturn(res, 200, {
        products: result,
        totalProduct,
        perPage,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  productDetails = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await productModel.findOne({ slug });
      const relatedProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product?.id,
              },
            },
            {
              category: {
                $eq: product?.category,
              },
            },
          ],
        })
        .limit(12);
      const moreProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product?.id,
              },
            },
            {
              sellerId: {
                $eq: product?.sellerId,
              },
            },
          ],
        })
        .limit(3);
      responseReturn(res, 200, { product, relatedProducts, moreProducts });
      // console.log(product);
    } catch (error) {
      console.log(error.message);
    }
  };

  submitReview = async (req, res) => {
    const { productId, name, review, rating } = req.body;

    try {
      await reviewModel.create({
        productId,
        name,
        rating,
        review,
        date: moment(Date.now()).format("LL"),
      });
      let rate = 0;
      const reviews = await reviewModel.find({ productId });
      for (let i = 0; i < reviews.length; i++) {
        rate = rate + reviews[i].rating;
      }
      let productRating = 0;
      if (reviews.length !== 0) {
        productRating = (rate / reviews.length).toFixed(1);
      }
      await productModel.findByIdAndUpdate(productId, {
        rating: productRating,
      });
      responseReturn(res, 201, { message: "Review added successfully" });
    } catch (error) {
      console.log(error.message);
    }
  };

  getReviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    const limit = 5;
    const skipPage = limit * (pageNo - 1);

    try {
      let getRating = await reviewModel.aggregate([
        {
          $match: {
            productId: {
              $eq: mongoose.Types.ObjectId.createFromHexString(productId),
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let ratingReview = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];
      for (let i = 0; i < ratingReview.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (ratingReview[i].rating === getRating[j]._id) {
            ratingReview[i].sum = getRating[j].count;
            break;
          }
        }
      }
      const getAll = await reviewModel.find({
        productId,
      });
      const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 });
      responseReturn(res, 200, { reviews, totalReview: getAll.length, ratingReview });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new homeControllers();
