import mongoose from "mongoose";
import bcrypt from "bcrypt";
import customerModel from "../models/customerModel";
import { customers } from "./data/customers";

const dsn = "mongodb://user:pass@localhost:27017/ecommerce?authSource=admin";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function seedCustomer() {
  await mongoose.connect(dsn);
  console.log("Start seeding...");

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(customer.password, salt);
    customer.password = hashedPassword;

    await customerModel.create(customer);
    console.log(`Inserted customer: ${customer.name}`);

    // Wait for 1 second before continuing to the next customer
    if (i < customers.length - 1) {
      await delay(1000); // Delay of 1000ms (1 second)
    }
  }
}

function main() {
  seedCustomer()
    .then(async () => {
      console.log("Customer seeding completed");
      await mongoose.disconnect();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error("Error seeding customer:", err);
      await mongoose.disconnect();
      process.exit(1);
    });
}

main();
