import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { IRatingSchema } from "../../ts/interfaces/rating.interface";
import UserModel from "../user.model";

const ratingSchema: Schema<IRatingSchema> = new Schema<IRatingSchema>({
	business_object_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
	user_object_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
	rating: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber
});

const userVirtualReference: VirtualTypeOptions<IRatingSchema> = {
	ref: UserModel,
	localField: "user_object_id",
	foreignField: "_id",
	justOne: true
};

ratingSchema.virtual("user_details", userVirtualReference);

export default ratingSchema;
