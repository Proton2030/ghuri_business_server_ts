import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { IThread } from "../../ts/interfaces/thread.interface";

const ThreadSchema: Schema<IThread> = new Schema<IThread>({
	thread_message: SCHEMA_DEFINITION_PROPERTY.requiredString,
	name: SCHEMA_DEFINITION_PROPERTY.requiredString,
	profile_photo: SCHEMA_DEFINITION_PROPERTY.requiredString
});

export default ThreadSchema;
