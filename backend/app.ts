import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "node:http";

import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import homeRoutes from "./routes/home/homeRoutes";
import cardRoutes from "./routes/home/cardRoutes";
import orderRoutes from "./routes/order/orderRoutes";
import chatRoutes from "./routes/chatRoutes";
import customerAuthRoutes from "./routes/home/customerAuthRoutes";
import dbConnect from "./utils/db";

const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let allCustomer = [];
let allSeller = [];
const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((user) => user.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({ customerId, socketId, userInfo });
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((user) => user.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({ sellerId, socketId, userInfo });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const removeSocket = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("socket server running...");
  socket.on("add_user", (customerId, userInfo) => {
    addUser(customerId, socket.id, userInfo);
    io.emit("activeSeller", allSeller);
    // console.log(allCustomer);
  });
  socket.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, socket.id, userInfo);
    io.emit("activeSeller", allSeller);
  });
  socket.on("send_seller_message", (msg) => {
    const customer = findCustomer(msg.receiverId);
    if (customer) {
      socket.to(customer.socketId).emit("seller_message", msg);
    }
  });
  socket.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller) {
      socket.to(seller.socketId).emit("customer_message", msg);
    }
  });
  socket.on("disconnect", () => {
    removeSocket(socket.id);
    io.emit("activeSeller", allSeller);
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // cookieParser() must appear before the router
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sellerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", customerAuthRoutes);
app.use("/api", cardRoutes);
app.use("/api", orderRoutes);
app.use("/api", chatRoutes);

dbConnect();

app.get("/", (req, res) => res.send("Backend!!"));
const port = process.env.PORT;

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
