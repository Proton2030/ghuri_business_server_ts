import { model } from "mongoose";
import { IThreadLikeSchema } from "../ts/interfaces/threadLike.interface";
import ThreadLikeSchema from "./shcemaDefinations/threadLike.schema";

const ThreadLikeModel = model<IThreadLikeSchema>("thread_likes", ThreadLikeSchema);

export default ThreadLikeModel;
