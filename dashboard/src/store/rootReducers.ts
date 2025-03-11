import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import sellerReducer from "./reducers/sellerReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: orderReducer,
};
export default rootReducer;
