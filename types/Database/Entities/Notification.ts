import { NotificationTypeEnum } from "../Enums/NotificationTypeEnum";

export type Notification = {
  id: string;
  user_id: string;
  type: NotificationTypeEnum;
  message: string;
  url: string;
  is_read: boolean;
  created_at: string;
};
