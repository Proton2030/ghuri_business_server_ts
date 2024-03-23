import { SchemaDefinitionProperty, Types } from "mongoose";

export interface INotification{
    user_object_id: SchemaDefinitionProperty<Types.ObjectId>,
    notification_title:string
}