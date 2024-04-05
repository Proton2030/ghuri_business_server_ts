"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importStar(require("body-parser"));
const db_config_1 = __importDefault(require("./config/db.config"));
const mongo_url = process.env.NODE_ENV !== "PROD" ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL;
// dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8989;
// const mongo_url = (process.env.NODE_ENV !== "PROD") ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL
const options = {
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use((0, cors_1.default)(options));
app.use((0, body_parser_1.json)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`<h1>sentss succesfully</h1>`);
});
app.use("/api/v1", require("./api/v1/routers/routes.index"));
// Middleware
app.use(body_parser_1.default.json());
(0, db_config_1.default)();
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
