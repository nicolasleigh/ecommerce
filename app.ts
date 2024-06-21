import express from "express";
import "dotenv/config";

const app = express();
app.get("/", (req, res) => res.send("Backend!!"));
const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
