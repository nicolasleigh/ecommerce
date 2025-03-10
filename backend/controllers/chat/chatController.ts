import sellerCustomerMessageModel from "../../models/chat/sellerCustomerMessageModel";
import sellerCustomerModel from "../../models/chat/sellerCustomerModel";
import adminSellerMessageModel from "../../models/chat/adminSellerMessage";
import customerModel from "../../models/customerModel";
import sellerModel from "../../models/sellerModel";
import { responseReturn } from "../../utils/response";

class chatController {
  addCustomerFriend = async (req, res) => {
    const { sellerId, userId } = req.body;

    try {
      if (sellerId !== "") {
        const seller = await sellerModel.findById(sellerId);
        const user = await customerModel.findById(userId);
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  friendId: sellerId,
                },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            {
              myId: userId,
            },
            {
              $push: {
                myFriends: {
                  friendId: sellerId,
                  name: seller?.shopInfo.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  friendId: userId,
                },
              },
            },
          ],
        });
        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  friendId: userId,
                  name: user.name,
                  image: "",
                },
              },
            }
          );
        }
        const messages = await sellerCustomerMessageModel.find({
          $or: [
            {
              $and: [
                {
                  receiverId: { $eq: sellerId },
                },
                {
                  senderId: {
                    $eq: userId,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  receiverId: { $eq: userId },
                },
                {
                  senderId: {
                    $eq: sellerId,
                  },
                },
              ],
            },
          ],
        });
        const myFriends = await sellerCustomerModel.findOne({ myId: userId });
        const currentFriend = myFriends?.myFriends.find((s) => s.friendId === sellerId);
        responseReturn(res, 200, { myFriends: myFriends?.myFriends, currentFriend, messages });
      } else {
        const myFriends = await sellerCustomerModel.findOne({ myId: userId });
        responseReturn(res, 200, { myFriends: myFriends?.myFriends });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  AddCustomerMessage = async (req, res) => {
    const { userId, text, sellerId, name } = req.body;

    try {
      const message = await sellerCustomerMessageModel.create({
        senderId: userId,
        senderName: name,
        receiverId: sellerId,
        message: text,
      });

      const data = await sellerCustomerModel.findOne({ myId: userId });
      let myFriends = data?.myFriends;
      let index = myFriends?.findIndex((f) => f.friendId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends,
        }
      );

      const data1 = await sellerCustomerModel.findOne({ myId: sellerId });
      let myFriends1 = data1?.myFriends;
      let index1 = myFriends1?.findIndex((f) => f.friendId === userId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error.message);
    }
  };

  getCustomers = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const data = await sellerCustomerModel.findOne({ myId: sellerId });
      responseReturn(res, 200, { customers: data?.myFriends });
    } catch (error) {
      console.log(error.message);
    }
  };

  getCustomersSellerMessage = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;

    try {
      const messages = await sellerCustomerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: customerId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: customerId,
                },
              },
            ],
          },
        ],
      });

      const currentCustomer = await customerModel.findById(customerId);
      responseReturn(res, 200, { currentCustomer, messages });
    } catch (error) {
      console.log(error.message);
    }
  };

  addSellerMessage = async (req, res) => {
    const { senderId, receiverId, text, name } = req.body;
    try {
      const message = await sellerCustomerMessageModel.create({
        senderId: senderId,
        senderName: name,
        receiverId: receiverId,
        message: text,
      });

      const data = await sellerCustomerModel.findOne({ myId: senderId });
      let myFriends = data?.myFriends;
      let index = myFriends?.findIndex((f) => f.friendId === receiverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );

      const data1 = await sellerCustomerModel.findOne({ myId: receiverId });
      let myFriends1 = data1?.myFriends;
      let index1 = myFriends1?.findIndex((f) => f.friendId === senderId);
      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }
      await sellerCustomerModel.updateOne(
        {
          myId: receiverId,
        },
        {
          myFriends1,
        }
      );
      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error.message);
    }
  };

  getSellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      responseReturn(res, 200, { sellers });
    } catch (error) {
      console.log(error.message);
    }
  };

  seller_admin_message_insert = async (req, res) => {
    const { senderId, receiverId, message, senderName } = req.body;

    try {
      const messageData = await adminSellerMessageModel.create({
        senderId,
        receiverId,
        message,
        senderName,
      });
      responseReturn(res, 200, { message: messageData });
    } catch (error) {
      console.log(error);
    }
  };

  get_admin_message = async (req, res) => {
    const { receiverId } = req.params;
    const id = "";

    try {
      const messages = await adminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });

      let currentSeller = {};
      if (receiverId) {
        currentSeller = await sellerModel.findById(receiverId);
      }

      responseReturn(res, 200, { currentSeller, messages });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_seller_message = async (req, res) => {
    const receiverId = "";
    const { id } = req;

    try {
      const messages = await adminSellerMessageModel.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });

      responseReturn(res, 200, { messages });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default new chatController();
