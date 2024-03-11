import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use("/auth", require("./auth/auth.routes"));
app.use("/business", require("./business/business.routes"));

module.exports = app;
