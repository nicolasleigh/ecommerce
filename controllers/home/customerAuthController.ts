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
}

export default new customerAuthController();
