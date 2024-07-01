import categoryModel from "../../models/categoryModel";
import { responseReturn } from "../../utils/response";

class homeControllers {
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
}

export default new homeControllers();
