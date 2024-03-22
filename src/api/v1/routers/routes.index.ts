import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use("/auth", require("./auth/auth.routes"));
app.use("/business", require("./business/business.routes"));
app.use("/category", require("./category/category.routes"));

module.exports = app;
