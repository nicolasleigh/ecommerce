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

  getSeller = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  sellerStatusUpdate = async (req, res) => {
    const { sellerId, status } = req.body;

    try {
      await sellerModel.findByIdAndUpdate(sellerId, { status });
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller, message: "Seller status updated." });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

export default new sellerController();
