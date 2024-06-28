import sellerModel from "../models/sellerModel";
import { responseReturn } from "../utils/response";

class sellerController {
  getSellerRequest = async (req, res) => {
    const { page, searchValue, parPage } = req.query;

    try {
      let skipPage = 0;
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }

      if (searchValue) {
      } else {
        const sellers = await sellerModel
          .find({ status: "pending" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel.find({ status: "pending" }).countDocuments();

        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

export default new sellerController();
