"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use("/auth", require("./auth/auth.routes"));
app.use("/business", require("./business/business.routes"));
app.use("/category", require("./category/category.routes"));
app.use("/advertisement", require("./add/add.routes"));
module.exports = app;
