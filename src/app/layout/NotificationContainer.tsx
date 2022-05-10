import React from "react";
import { useAppContext } from "../contexts/App.context";
import { Toast, ToastContainer } from "react-bootstrap";
import { NotificationDto } from "../dtos/Notification.dto";

interface NotificationProps {
  notification: NotificationDto;
  onClose(): void;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  onClose,
}) => {
  return (
    <Toast bg={notification.severity} onClose={onClose} delay={3000} autohide>
      <Toast.Header>
        <div className="w-100">{notification.header}</div>
      </Toast.Header>
      <Toast.Body className="text-white">{notification.message}</Toast.Body>
    </Toast>
  );
};

const NotificationContainer = () => {
  const {
    notification: { notifications, removeNotification },
  } = useAppContext();

  const renderNotification = (notification: NotificationDto) => (
    <Notification
      key={notification.id}
      notification={notification}
      onClose={() => removeNotification(notification)}
    />
  );

  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map(renderNotification)}
    </ToastContainer>
  );
};

export default NotificationContainer;
