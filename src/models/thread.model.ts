import { model } from "mongoose";
import { IThreadSchema } from "../ts/interfaces/thread.interface";
import ThreadSchema from "./shcemaDefinations/thread.schema";

const ThreadModel = model<IThreadSchema>("ThreadSchema", ThreadSchema);

export default ThreadModel;
