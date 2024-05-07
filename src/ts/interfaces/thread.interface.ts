import { IObjectId } from "./objectId.interface";

export interface IThreadSchema {
	thread_message: string;
}

export interface IThread extends IThreadSchema, IObjectId {}
