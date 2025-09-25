import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000', {
  path: '/socket.io',
  transports: ['websocket'],
});

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { text, user: 'Student', channel: 'general' });
    setText('');
  };

  return (
    <div className="chatroom p-4">
      <div className="messages h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2"><b>{msg.user}:</b> {msg.text}</div>
        ))}
      </div>
      <div className="flex mt-2">
        <input value={text} onChange={e => setText(e.target.value)} className="border flex-1"/>
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white">Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
