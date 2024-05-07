import { IObjectId } from "./objectId.interface";

export interface IThreadSchema {
	thread_message: string;
	user_object_id: string;
	thread_image_url: string;
	name: string;
	profile_photo: string;
	like_count: number;
	comment_count: number;
	comment_message: string;
}

export interface IThread extends IThreadSchema, IObjectId {}
