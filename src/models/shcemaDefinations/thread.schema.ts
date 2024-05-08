import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IThreadSchema } from "../../ts/interfaces/thread.interface";
import UserModel from "../user.model";

const ThreadSchema: Schema<IThreadSchema> = new Schema<IThreadSchema>(
	{
		message_body: SCHEMA_DEFINITION_PROPERTY.requiredString,
		like_count: { ...SCHEMA_DEFINITION_PROPERTY.optionalNullNumber, default: 0 },
		dislike_count: { ...SCHEMA_DEFINITION_PROPERTY.optionalNullNumber, default: 0 },
		message_media_url: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		user_object_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId
	},
	{ ...GENERAL_SCHEMA_OPTIONS, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const userVirtualReference: VirtualTypeOptions<IThreadSchema> = {
	ref: UserModel,
	localField: "user_object_id",
	foreignField: "_id",
	justOne: true
};

ThreadSchema.virtual("user_details", userVirtualReference);

export default ThreadSchema;
