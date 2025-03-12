import stripeModel from "../../models/stripeModel";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { responseReturn } from "../../utils/response";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

class paymentController {
  createStripeConnectAccount = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
      const stripeInfo = await stripeModel.findOne({ sellerId: id });
      if (stripeInfo) {
        await stripeModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:5173/refresh",
          return_url: `http://localhost:5173/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:5173/refresh",
          return_url: `http://localhost:5173/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default new paymentController();
