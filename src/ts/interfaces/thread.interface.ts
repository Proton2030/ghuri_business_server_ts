import { SchemaDefinitionProperty, Types } from "mongoose";

export interface IThreadSchema {
	message_body: string;
	user_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	message_media_url: string;
	like_count: number;
	comments_count:number;
	is_approved: boolean;
	dislike_count: number;
}
