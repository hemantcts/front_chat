import React, { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import NameModal from './Components/NameModal';

function App() {
  const socket = useMemo(() => io('https://alerts.socceryou.ch/'), []);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const room = 'chatRoom';

  useEffect(() => {
    if (!modalOpen) {
      socket.emit('join room', room);

      // Listen for all chat-related events
      socket.onAny((event, ...args) => {
        console.log('Received event:', event, args);
        // Handle chat-message event
        if (event === 'chat-message') {
          const [data] = args;
          const { message, userid } = data;
          const newMessage = { type: 'other', text: message, sender: userid };
          setMessages(prevMessages => [...prevMessages, newMessage]);
          // Add new message notification
          setNotifications(prevNotifications => [
            ...prevNotifications,
            { type: 'message', text: `${userid} sent you a new message` }
          ]);
        }
        // Handle user-joined event
        else if (event === 'user-joined') {
          const [data] = args;
          const { userid } = data;
          if (!users.find(user => user.userid === userid)) {
            const newUser = { userid, message: `${userid} joined the ${room}` };
            setUsers(prevUsers => [...prevUsers, newUser]);
            // Add user join notification
            setNotifications(prevNotifications => [
              ...prevNotifications,
              { type: 'join', text: `${userid} joined the ${room}` }
            ]);
          }
        }
      });

      return () => {
        socket.offAny(); // Remove all event listeners
      };
    }
  }, [modalOpen, users, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = { type: 'user', text: message };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      socket.emit('chat-message', { room, message });
    }
  };

  const handleNameSubmit = (name) => {
    socket.emit('set-name', name);
    setModalOpen(false);
  };

  return (
    <div className="App">
      {modalOpen && <NameModal onSubmit={handleNameSubmit} />}

      {!modalOpen && (
        <div className="chat-container">
          <div className="notifications" style={{overflowY: "scroll", maxHeight: "100vh"}}>
            {notifications.map((notif, index) => (
              <div key={index} className="notification">
                {notif.text}
              </div>
            ))}
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type === 'user' ? 'message' : 'message2'} style={{ wordBreak: "break-all" }}>
                {msg.sender && `${msg.sender}:`} {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
