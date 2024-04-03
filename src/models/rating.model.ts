import { model } from "mongoose";
import { IRatingSchema } from "../ts/interfaces/rating.interface";
import ratingSchema from "./shcemaDefinations/rating.schema";

const RatingModel = model<IRatingSchema>("rating", ratingSchema);

export default RatingModel;
