import { Schema, model } from "mongoose";

const sellerCustomerMessageSchema = new Schema(
  {
    senderName: {
      type: String,
      requires: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  { timestamps: true }
);

export default model("seller_customers_msgs", sellerCustomerMessageSchema);
