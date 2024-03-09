import { IObjectId } from "./objectId.interface";

export interface IBussinessSchema {
	user_object_id: string;
	name: string;
	phone_no: string;
	email: string;
	location: string;
	category: string;
	description: string;
	photo: string[];
	status: string;
}

export interface IBussiness extends IBussinessSchema, IObjectId {}
