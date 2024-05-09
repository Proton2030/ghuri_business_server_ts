import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import UserModel from "../user.model";
import { IThreadCommentSchema } from "../../ts/interfaces/thread.comment.interface";

const ThreadCommentSchema: Schema<IThreadCommentSchema> = new Schema<IThreadCommentSchema>(
	{
		comment_message: SCHEMA_DEFINITION_PROPERTY.requiredString,
		user_object_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
		post_id: SCHEMA_DEFINITION_PROPERTY.requiredObjectId
	},
	{ ...GENERAL_SCHEMA_OPTIONS, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const userVirtualReference: VirtualTypeOptions<IThreadCommentSchema> = {
	ref: UserModel,
	localField: "user_object_id",
	foreignField: "_id",
	justOne: true
};

ThreadCommentSchema.virtual("user_details", userVirtualReference);

export default ThreadCommentSchema;
