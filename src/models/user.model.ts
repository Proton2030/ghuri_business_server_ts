import { model } from "mongoose";
import { IUserSchema } from "../ts/interfaces/user.interface";
import UserSchema from "./shcemaDefinations/user.schema";

const UserModel = model<IUserSchema>("user", UserSchema);

export default UserModel;
