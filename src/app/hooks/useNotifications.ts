import { useState } from "react";
import { NotificationDto } from "../dtos/Notification.dto";

export interface NotificationsState {
  notifications: NotificationDto[];
  sendSuccessNotification(message: string, header?: string): void;
  sendWarningNotification(message: string, header?: string): void;
  sendErrorNotification(message: string, header?: string): void;
  sendInfoNotification(message: string, header?: string): void;
  removeNotification(notification: NotificationDto): void;
}

export const useNotifications = (): NotificationsState => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);

  const addNotification = (notification: NotificationDto) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  const sendSuccessNotification = (message: string, header?: string) =>
    addNotification(NotificationDto.Success(message, header));

  const sendWarningNotification = (message: string, header?: string) =>
    addNotification(NotificationDto.Warning(message, header));

  const sendErrorNotification = (message: string, header?: string) =>
    addNotification(NotificationDto.Error(message, header));

  const sendInfoNotification = (message: string, header?: string) =>
    addNotification(NotificationDto.Info(message, header));

  const removeNotification = (notification: NotificationDto) =>
    setNotifications((notifications) =>
      notifications.filter((n) => n.id !== notification.id)
    );

  return {
    notifications,
    removeNotification,
    sendSuccessNotification,
    sendErrorNotification,
    sendWarningNotification,
    sendInfoNotification,
  };
};
