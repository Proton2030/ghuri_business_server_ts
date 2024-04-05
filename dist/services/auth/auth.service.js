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
exports.auth = exports.convertCaseInsensitiveForQuery = exports.generateJWT = exports.comparePassword = exports.hashPassword = exports.isDuplicateUserEmailService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isDuplicateUserEmailService = (userMOdel, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { email };
        const emailInstance = yield userMOdel.findOne(filter);
        if (emailInstance) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
    }
});
exports.isDuplicateUserEmailService = isDuplicateUserEmailService;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const encryptPassword = yield bcryptjs_1.default.hash(password, salt);
    return encryptPassword;
});
exports.hashPassword = hashPassword;
const comparePassword = (inputPassword, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const compare = yield bcryptjs_1.default.compare(inputPassword, dbPassword);
    if (compare)
        return true;
    else
        return false;
});
exports.comparePassword = comparePassword;
const generateJWT = (jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtToken = jsonwebtoken_1.default.sign(Object.assign({}, jwtPayload), process.env.JWT_KEY, {
        expiresIn: "1y"
    });
    return jwtToken;
});
exports.generateJWT = generateJWT;
const convertCaseInsensitiveForQuery = (value) => {
    try {
        return { $regex: value, $options: "i" };
    }
    catch (error) {
        throw error;
    }
};
exports.convertCaseInsensitiveForQuery = convertCaseInsensitiveForQuery;
exports.auth = {
    isDuplicateUserEmailService: exports.isDuplicateUserEmailService,
    hashPassword: exports.hashPassword,
    comparePassword: exports.comparePassword,
    generateJWT: exports.generateJWT,
    convertCaseInsensitiveForQuery: exports.convertCaseInsensitiveForQuery
};
