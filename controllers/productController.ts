import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel";
import { responseReturn } from "../utils/response";

class productController {
  productAdd = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      let { name, category, description, stock, price, discount, shopName, brand } = field;
      const { images } = files;
      name = name.trim().toLowerCase();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        let allImageUrl = [];
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
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        });

        responseReturn(res, 201, { message: "Product added successfully" });
      } catch (error) {
        console.log(error.message);
      }
    });
  };
}
export default new productController();
