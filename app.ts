import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import router from "./routes/authRoutes";
import dbConnect from "./utils/db";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // cookieParser() must appear before the router
app.use("/api", router);

dbConnect();

app.get("/", (req, res) => res.send("Backend!!"));
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
