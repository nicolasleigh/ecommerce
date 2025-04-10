import formidable from "formidable";
import { responseReturn } from "../utils/response";
import categoryModel from "../models/categoryModel";
import cloudinary from "../utils/cloud";

class categoryControllers {
  addCategory = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "something went wrong" });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim().toLowerCase();
        const slug = name.split(" ").join("-");

        try {
          const result = await cloudinary.uploader.upload(image.filepath, { folder: "categories" });
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, { category, message: "Category added successfully" });
          } else {
            responseReturn(res, 404, { error: "Image upload failed" });
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  editCategory = async (req, res) => {
    const { categoryId } = req.params;
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "something went wrong" });
      }
      let { name } = fields;
      let { image } = files;

      let imageUrl = "";
      name = name?.trim().toLowerCase();
      const slug = name?.split(" ").join("-");

      if (image) {
        const { secure_url: url } = await cloudinary.uploader.upload(image.filepath, { folder: "categories" });
        imageUrl = url;
      }

      const updateObj = {
        name: name,
        slug: slug,
        image: imageUrl,
      };
      // console.log("updateObj---before", updateObj);
      Object.keys(updateObj).forEach((k) => !Boolean(updateObj[k]) && delete updateObj[k]);
      // console.log("updateObj---after", updateObj);

      const category = await categoryModel.findByIdAndUpdate(
        categoryId,
        {
          ...updateObj,
        },
        { new: true }
      );
      responseReturn(res, 201, { category, message: "Category updated successfully" });
    });
  };

  getCategory = async (req, res) => {
    const { page, searchValue, perPage } = req.query;

    try {
      let skipPage = 0;
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && perPage) {
        const categories = await categoryModel
          .find({ $text: { $search: searchValue } })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      } else if (searchValue === "" && page && perPage) {
        const categories = await categoryModel.find({}).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      } else {
        const categories = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new categoryControllers();
