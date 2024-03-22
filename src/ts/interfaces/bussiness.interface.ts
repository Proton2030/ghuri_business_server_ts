import { IObjectId } from "./objectId.interface";

export interface IBussinessSchema {
	user_object_id: string;
	name: string;
	phone_no: string;
	email: string;
	location: string;
	avg_rate: number;
	no_of_rates: number;
	category: string;
	description: string;
	photo: string[];
	status: string;
	is_active: boolean;
	pin_code: number;
}

export interface IBussiness extends IBussinessSchema, IObjectId {}
