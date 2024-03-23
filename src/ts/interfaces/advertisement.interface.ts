import { IObjectId } from "./objectId.interface";

export interface IAddSchema {
	image_url: string;
	target_url: string;
	active: boolean;
}

export interface IAdd extends IAddSchema, IObjectId {}
