import categoryModel from "../../models/categoryModel";
import productModel from "../../models/productModel";
import { responseReturn } from "../../utils/response";

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
}

export default new homeControllers();
