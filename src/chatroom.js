import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, Form } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Ensure this file includes the styles mentioned

const socket = io('');

const ChatPanel = ({ isOpen, closeChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSend = () => {
    if (message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <CSSTransition
    in={isOpen}
    timeout={2000}
    classNames="chat-transition"
    unmountOnExit
  >
    <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
   <Button className="close-btn" onClick={closeChat}>✖️</Button>
   <h2 className="text-center">Chat (Coming Soon)</h2>
   <div className="chat-messages">
    {messages.map((msg, index) => (
      <div key={index} className="chat-message">{msg}</div>
    ))}
    </div>
   <div className="input-container">
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      placeholder="Type your message"
    />
      <Button onClick={handleSend}>Send</Button>
  </div>
</div>
  </CSSTransition>
  );
};

export default ChatPanel;
