"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
console.log("NODE_ENV", String(config_1.NODE_ENV));
const mongoURI = String(config_1.NODE_ENV) == "PROD"
    ? "mongodb://127.0.0.1:27082/PROD"
    : String(config_1.NODE_ENV) == "DEV"
        ? "mongodb://127.0.0.1:27082/DEV"
        : String(config_1.NODE_ENV) == "LOCAL"
            ? "mongodb+srv://adarshahalder02:adarsha123@cluster0.xsarf3h.mongodb.net/ghuri"
            : "";
console.log("First Connection", mongoURI);
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoURI) {
            const conn = yield mongoose_1.default.connect(mongoURI, {
                serverSelectionTimeoutMS: 40000
            });
            console.log("Second Connection -->", mongoURI);
            console.log(`\x1b[34m \x1b[1m \x1b[4mMongoDB Connected: ${conn.connection.port}\x1b[0m`);
        }
    }
    catch (err) {
        throw err;
    }
});
exports.default = connectDb;
