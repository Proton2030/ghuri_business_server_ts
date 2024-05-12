import { SchemaDefinitionProperty, Types } from "mongoose";

export interface IThreadLikeSchema {
	is_liked: boolean;
	is_disliked: boolean;
	user_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	post_id: SchemaDefinitionProperty<Types.ObjectId>;
}
