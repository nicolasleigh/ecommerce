import mongoose from "mongoose";
import bcrypt from "bcrypt";
import customerModel from "../models/customerModel";
import { customers } from "./data/customers";
import adminModel from "../models/adminModel";
import { admin } from "./data/admin";
import sellerModel from "../models/sellerModel";
import { seller } from "./data/seller";
import { categories } from "./data/categories";
import categoryModel from "../models/categoryModel";
import { products } from "./data/products";
import productModel from "../models/productModel";
import sellerCustomerModel from "../models/chat/sellerCustomerModel";

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

    const createCustomer = await customerModel.create(customer);
    await sellerCustomerModel.create({
      myId: createCustomer.id,
    });
    console.log(`Inserted customer: ${customer.name}`);

    // Wait for 1 second before continuing to the next customer
    if (i < customers.length - 1) {
      await delay(1000); // Delay of 1000ms (1 second)
    }
  }
}

async function seedAdmin() {
  await mongoose.connect(dsn);

  const exist = await adminModel.exists({ email: "admin@email.com" });

  if (!exist) {
    await adminModel.create(admin);
    console.log("Admin created successfully");
  } else {
    console.log("Admin already exists");
  }

  await mongoose.disconnect();
}

async function seedSeller() {
  await mongoose.connect(dsn);

  const exist = await sellerModel.exists({ email: "seller@email.com" });

  if (!exist) {
    const createSeller = await sellerModel.create(seller);
    await sellerCustomerModel.create({
      myId: createSeller.id,
    });
    console.log("Seller created successfully");
  } else {
    console.log("Seller already exists");
  }

  await mongoose.disconnect();
}

async function seedCategory() {
  await mongoose.connect(dsn);

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    await categoryModel.create(category);

    if (i < customers.length - 1) {
      await delay(1000);
    }
  }
}

async function seedProduct() {
  await mongoose.connect(dsn);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const seller = await sellerModel.findOne({ email: "seller@email.com" });
    if (!seller) {
      console.log("Error: 'seller@email.com' does not exist");
      return;
    }

    product.sellerId = seller._id;

    await productModel.create(product);
    console.log(`Inserted product: ${product.name}`);

    if (i < customers.length - 1) {
      await delay(1000);
    }
  }
}

function main() {
  // seedCustomer()
  //   .then(async () => {
  //     console.log("Customer seeding completed");
  //     await mongoose.disconnect();
  //     process.exit(0);
  //   })
  //   .catch(async (err) => {
  //     console.error("Error seeding customer:", err);
  //     await mongoose.disconnect();
  //     process.exit(1);
  //   });
  // seedAdmin()
  //   .then(() => {
  //     console.log("Admin seeding completed");
  //     process.exit(0);
  //   })
  //   .catch((err) => {
  //     console.error("Error seeding admin:", err);
  //     process.exit(1);
  //   });
  // seedSeller()
  //   .then(() => {
  //     console.log("Seller seeding completed");
  //     process.exit(0);
  //   })
  //   .catch((err) => {
  //     console.error("Error seeding seller:", err);
  //     process.exit(1);
  //   });
  // seedCategory()
  //   .then(async () => {
  //     console.log("Category seeding completed");
  //     await mongoose.disconnect();
  //     process.exit(0);
  //   })
  //   .catch(async (err) => {
  //     console.error("Error seeding category:", err);
  //     await mongoose.disconnect();
  //     process.exit(1);
  //   });
  seedProduct()
    .then(async () => {
      console.log("Seeding completed");
      await mongoose.disconnect();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error("Error:", err);
      await mongoose.disconnect();
      process.exit(1);
    });
}

main();
