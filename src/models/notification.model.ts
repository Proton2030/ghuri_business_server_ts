import { model } from "mongoose";
import { INotification } from "../ts/interfaces/notification.interface";
import notificationSchema from "./shcemaDefinations/notification.schema";

const NotificationModel = model<INotification>("Notification", notificationSchema);

export default NotificationModel;
