import { model } from "mongoose";
import UserSchema from "./shcemaDefinations/user.schema";
import { IUserDetails } from "../ts/interfaces/userDetails.types";

const UserModel = model<IUserDetails>("user", UserSchema);

export default UserModel;
