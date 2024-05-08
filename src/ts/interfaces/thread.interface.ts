import { SchemaDefinitionProperty, Types } from "mongoose";

export interface IThreadSchema {
	message_body: string;
	user_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	message_media_url: string;
	like_count: number;
	dislike_count: number;
}
