import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use("/auth", require("./auth/auth.routes"));
app.use("/business", require("./business/business.routes"));
app.use("/category", require("./category/category.routes"));
app.use("/advertisement", require("./add/add.routes"));
app.use("/thread", require("./thread/thread.routes"));

module.exports = app;
