const express = require("express");
const userModel = require("../models/userModel");

const userRouter = express.Router();

userRouter.get("/get/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    let data = await userModel.find({ email });
    res.send(data[0]);
  } catch (err) {
    res.send({ msg: "error", err });
  }
});

userRouter.post("/register", async (req, res, next) => {
  let body = req.body;
  try {
    let data = await userModel.find({ email });
    if (data.length > 0) {
      res.send("Already registered, Please Login!");
    } else {
      try {
        let user = new userModel(body);
        await user.save();
        res.send("User Registered");
      } catch (err) {
        res.send({ msg: "error", err });
      }
    }
  } catch (err) {
    res.send({ msg: "error", err });
  }
});

userRouter.post("/login", async (req, res, next) => {
  let body = req.body;
  const { email, password } = body;
  try {
    let data = await userModel.find({ email });
    if (data.length > 0) {
      if (data[0].email == email && data[0].password == password) {
        try {
          console.log(data[0].id);
          let ans = await userModel.findByIdAndUpdate(data[0].id, {
            time: Date(),
          });
          console.log(ans);
        } catch (err) {
          res.send({ msg: "error", err });
        }
        res.send({ msg: "Login Successful", token: data[0].email });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("Incorrect Email");
    }
  } catch (err) {
    res.send({ msg: "error", err });
  }
});

userRouter.post("/calculate", (req, res, next) => {
  let data = req.body;
  const { amount, interest, years } = data;

  let maturity = +(
    amount *
    (((1 + interest / 100) ** years - 1) / (interest / 100))
  ).toFixed(0);
  let investment = years * amount;
  let gain = maturity - investment;
  res.send({ maturity, investment, gain });
});

module.exports = userRouter;
