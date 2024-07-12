import React, { useState, useEffect, useMemo } from 'react';
import {io} from 'socket.io-client';
import './App.css';


function App() {
  const socket = useMemo(() => io('https://alerts.socceryou.ch/'), []);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [messages2, setMessages2] = useState([]);
  const room = 'chatRoom';

  useEffect(() => {
    socket.emit('join room', room);

    socket.on('chat-message', (message) => {
      const newMessage = { type: 'other', text: message };
      setMessages([...messages, newMessage]);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== '') {
      const newMessage = { type: 'user', text: message };
      setMessages([...messages, newMessage]);
      console.log(message, messages);
      setMessage('');
      socket.emit('chat-message', {room, message});
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'user' ? 'message' : 'message2'} style={{wordBreak:"break-all"}}>
              {msg.text}
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
    </div>
  );
}

export default App;
