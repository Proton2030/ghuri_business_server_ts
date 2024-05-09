import { SchemaDefinitionProperty, Types } from "mongoose";

export interface IThreadCommentSchema {
	comment_message: string;
	user_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	post_id: SchemaDefinitionProperty<Types.ObjectId>;
}
