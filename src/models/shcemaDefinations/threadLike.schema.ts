import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IThreadCommentSchema } from "../../ts/interfaces/thread.comment.interface";
import { IThreadLikeSchema } from "../../ts/interfaces/threadLike.interface";
import UserModel from "../user.model";

const ThreadLikeSchema: Schema<IThreadLikeSchema> = new Schema<IThreadLikeSchema>(
	{
		is_liked: SCHEMA_DEFINITION_PROPERTY.optionalBoolean,
		is_disliked: SCHEMA_DEFINITION_PROPERTY.optionalBoolean,
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

ThreadLikeSchema.virtual("user_details", userVirtualReference);

export default ThreadLikeSchema;
