import cardModel from "../../models/cardModel";
import { responseReturn } from "../../utils/response";

class cardController {
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });

      if (product) {
        responseReturn(res, 404, { error: "Product already added to cart" });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, { product, message: "Product added successfully" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new cardController();
