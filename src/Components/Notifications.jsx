import React, { useState, useEffect } from 'react';
import { subscribeToNotifications, emitNotification } from './socketService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    subscribeToNotifications((data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });
  }, []);


  const handleSendNotification = () => {
    emitNotification(`New notification ${notifications.length + 1}`);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={handleSendNotification}>Send Notification</button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
