import bcrypt from "bcrypt";
import adminModel from "../models/adminModel";
import sellerModel from "../models/sellerModel";
import sellerCustomerModel from "../models/chat/sellerCustomerModel";
import { responseReturn } from "../utils/response";
import createToken from "../utils/tokenCreate";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const matched = await bcrypt.compare(password, admin.password);
        if (matched) {
          const token = await createToken({
            id: admin._id,
            role: admin.role,
          });
          res.cookie("accessToken", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
          responseReturn(res, 200, { token, message: "Login success." });
        } else {
          responseReturn(res, 404, { error: "Password wrong." });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found." });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const matched = await bcrypt.compare(password, seller.password);
        if (matched) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
          responseReturn(res, 200, { token, message: "Login success." });
        } else {
          responseReturn(res, 404, { error: "Password wrong." });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found." });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const user = await sellerModel.findOne({ email });
      if (user) {
        responseReturn(res, 404, { error: "Email Already Exists!" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manually",
          shopInfo: {},
        });
        await sellerCustomerModel.create({
          myId: seller.id,
        });
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        responseReturn(res, 201, { token, message: "Register Success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      // responseReturn(res, 500, { error: "Internal Server Error" });
      console.log(error.message);
    }
  };

  profileImageUpload = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      const { image } = files;

      try {
        const result = await cloudinary.uploader.upload(image.filepath, { folder: "profile" });
        if (result) {
          await sellerModel.findByIdAndUpdate(id, { image: result.url });
          const userInfo = await sellerModel.findById(id);
          responseReturn(res, 201, { userInfo, message: "Profile image upload successfully" });
        } else {
          responseReturn(res, 404, { error: "Image upload failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  profileInfoAdd = async (req, res) => {
    const { division, district, shopName, subDistrict } = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          division,
          district,
          subDistrict,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, { message: "Profile info added successfully", userInfo });
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };
}

export default new authControllers();
