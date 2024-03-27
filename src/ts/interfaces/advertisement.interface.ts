import { IObjectId } from "./objectId.interface";

export interface IAddSchema {
	photo: string[];
	target_url: string;
	active: boolean;
}

export interface IAdd extends IAddSchema, IObjectId {}
