import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/authRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);
app.use(cookieParser());

app.get("/", (req, res) => res.send("Backend!!"));
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
