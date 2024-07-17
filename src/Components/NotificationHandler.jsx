import { useEffect } from 'react';
import { messaging } from './firebaseConfig'; // Ensure correct path to firebaseConfig
import { getToken, onMessage } from 'firebase/messaging';

const NotificationHandler = () => {

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("permission done");

            const token = await getToken(messaging, { vapidKey: 'BG-CQGs0c4zglqVKgR2_2GLN0YdI-7ChwwBY7sDxT7fedEnVSAmF7Q-WPt-qGtZC_oalrBJA4VLydGGZUFg5JBM' })
            console.log( token)
        }
        else {
            console.log("permission denied");
        }
    }

    useEffect(() => {
        requestPermission();

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("run")
            console.log("Foreground message received:", payload);

            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: payload.notification.icon
            };
            new Notification(notificationTitle, notificationOptions);
        });

        const some = () =>{
            console.log("working")
        }

        return () => {
            unsubscribe();
            some();
        };
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
        </div>
    );
};

export default NotificationHandler;
