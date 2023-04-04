const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/", (req, res) => {
  res.send("Home Route");
});

app.listen(8080, async () => {
  console.log("Server started at port 8080");
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
});
