"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thread_controllers_1 = require("../../controllers/thread/thread.controllers");
const router = express_1.default.Router();
router.post("/createThread", thread_controllers_1.createThread);
router.route("/getThread").get(thread_controllers_1.getThread);
module.exports = router;
