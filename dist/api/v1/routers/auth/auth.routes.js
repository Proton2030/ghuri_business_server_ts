"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLogin_1 = require("../../controllers/auth/login/userLogin");
const router = express_1.default.Router();
router.route("/login").post(userLogin_1.userLogin);
module.exports = router;
