import { model } from "mongoose";
import { IThread } from "../ts/interfaces/thread.interface";
import ThreadSchema from "./shcemaDefinations/thread.schema";

const ThreadModel = model<IThread>("ThreadSchema", ThreadSchema);

export default ThreadModel;
