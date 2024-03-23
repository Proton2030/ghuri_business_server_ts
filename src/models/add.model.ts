import { model } from "mongoose";
import UserSchema from "./shcemaDefinations/user.schema";
import { IUserDetails } from "../ts/interfaces/userDetails.types";
import { IAdd } from "../ts/interfaces/advertisement.interface";
import AdvertisementSchema from "./shcemaDefinations/advertisement.shema";

const AddModel = model<IAdd>("Advertisements", AdvertisementSchema);

export default AddModel;
