const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const itemRouter = require("./routes/itemsRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/order", orderRouter);

module.exports = app;