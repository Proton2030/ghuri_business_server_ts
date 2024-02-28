import { model } from "mongoose";
import { IUserSchema } from "../ts/interfaces/user.interface";
import UserSchema from "./shcemaDefinations/user.schema";
import { IBussinessSchema } from "../ts/interfaces/bussiness.interface";
import BussinessSchema from "./shcemaDefinations/bussiness.schema";

const BussinessModel= model<IBussinessSchema>("Bussiness", BussinessSchema);

export default BussinessModel;
