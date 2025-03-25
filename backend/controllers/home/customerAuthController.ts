import sellerCustomerModel from "../../models/chat/sellerCustomerModel";
import customerModel from "../../models/customerModel";
import { responseReturn } from "../../utils/response";
import bcrypt from "bcrypt";
import createToken from "../../utils/tokenCreate";

class customerAuthController {
  customerRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exists!" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "manually",
        });
        console.log("createCustomer id: ", createCustomer.id);
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 200, { token, message: "User register success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel.findOne({ email }).select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { token, message: "User login successfully" });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customerUpdatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
      const customer = await customerModel.findOne({ email }).select("+password");
      if (customer) {
        const matched = await bcrypt.compare(oldPassword, customer.password);
        if (matched) {
          await customerModel.findByIdAndUpdate(customer.id, { password: await bcrypt.hash(newPassword, 10) });
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
          responseReturn(res, 200, { token, message: "Password reset successfully" });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Customer not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  customerLogout = async (req, res) => {
    res.cookie("customerToken", "", {
      expires: new Date(Date.now()),
    });

    responseReturn(res, 200, { message: "Logout Success" });
  };
}

export default new customerAuthController();
