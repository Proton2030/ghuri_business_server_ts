import { model } from "mongoose";
import { IThreadCommentSchema } from "../ts/interfaces/thread.comment.interface";
import ThreadCommentSchema from "./shcemaDefinations/thread.comment.schema";

const ThreadCommentModel = model<IThreadCommentSchema>("ThreadCommentSchema", ThreadCommentSchema);

export default ThreadCommentModel;
