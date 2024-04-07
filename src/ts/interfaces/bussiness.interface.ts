import { IObjectId } from "./objectId.interface";

export interface IBussinessSchema {
	user_object_id: string;
	name: string;
	phone_no: string;
	email: string;
	location: string;
	is_active: string;
	avg_rate: number;
	no_of_rates: number;
	category: string;
	description: string;
	photo: string[];
	status: string;
	lat: number;
	lon: number;
}

export interface IBussiness extends IBussinessSchema, IObjectId {}
