const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user_routes");
const app = express();

app.use(express.json());
app.use('/users',router);

mongoose
  .connect(
    "mongodb+srv://admin:Chapacho6@cluster0.30bkhui.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(3000, () => console.log("Connected to mongodb and listening to port 3000...")))
  .catch((err) => console.log(err));
