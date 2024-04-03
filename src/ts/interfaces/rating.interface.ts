import { SchemaDefinitionProperty, Types } from "mongoose";

export interface IRatingSchema{
    business_object_id:SchemaDefinitionProperty<Types.ObjectId>,
    user_object_id: SchemaDefinitionProperty<Types.ObjectId>,
    rating: number
}