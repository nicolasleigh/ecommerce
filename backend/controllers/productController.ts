import formidable from "formidable";
import productModel from "../models/productModel";
import { responseReturn } from "../utils/response";
import cloudinary from "../utils/cloud";

class productController {
  productAdd = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      let { name, category, description, stock, price, discount, shopName, brand } = field;
      const { images } = files;
      name = name.trim().toLowerCase();
      const slug = name.split(" ").join("-");

      try {
        let allImageUrl = [];

        if (!images?.length && images) {
          const result = await cloudinary.uploader.upload(images.filepath, { folder: "products" });
          allImageUrl = [...allImageUrl, result.url];
        }
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, { folder: "products" });
          allImageUrl = [...allImageUrl, result.url];
        }

        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount) || 0,
          images: allImageUrl,
          brand: brand.trim(),
        });

        responseReturn(res, 201, { message: "Product added successfully" });
      } catch (error) {
        console.log(error.message);
        responseReturn(res, 400, { error: "Failed to add product" });
      }
    });
  };

  productsGet = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    const { id } = req;

    try {
      let skipPage = 0;
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      if (searchValue) {
        const products = await productModel
          // .find({ $text: { $search: searchValue }, sellerId: id })
          .find({ $text: { $search: searchValue } })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            // sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await productModel
          // .find({ sellerId: id })
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel.find({ sellerId: id }).countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  productGet = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };

  productUpdate = async (req, res) => {
    let { name, description, stock, price, discount, brand, productId, category } = req.body;
    name = name.trim().toLowerCase();
    const slug = name.split(" ").join("-");

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        stock,
        price,
        discount,
        brand,
        productId,
        category,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product, message: "Product updated." });
    } catch (error) {
      console.log(error.message);
    }
  };

  productImageUpdate = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      const { oldImage, productId } = fields;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          const result = await cloudinary.uploader.upload(newImage.filepath, { folder: "products" });
          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId, { images });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product, message: "Image updated successfully" });
          } else {
            responseReturn(res, 404, { error: "Image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
}

export default new productController();
