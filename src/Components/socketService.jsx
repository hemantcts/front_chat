import { io } from 'socket.io-client';

const socket = io('http://localhost:5000/');

const subscribeToNotifications = (callback) => {
    socket.on('new-notification', (data) => {
        callback(data);
    });
};

const emitNotification = (message) => {
    socket.emit('new-notification', { message });
};

export { subscribeToNotifications, emitNotification };