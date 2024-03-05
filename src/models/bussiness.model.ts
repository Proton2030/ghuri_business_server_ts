import { model } from "mongoose";
import { IBussinessSchema } from "../ts/interfaces/bussiness.interface";
import BussinessSchema from "./shcemaDefinations/bussiness.schema";

const BussinessModel= model<IBussinessSchema>("Bussiness", BussinessSchema);

export default BussinessModel;
