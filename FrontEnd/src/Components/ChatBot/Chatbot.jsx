import React, { useState } from 'react';
import './Chatbot.css';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };
  
    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setTimeout(() => {
            setMessages([...messages, { text: inputValue, sender: 'user' }, { text: 'This is a proxy response from the chatbot.', sender: 'bot' }]);
            }, 1000);
            setInputValue('');
        }
    };
  
    return (
        <div className="chat-bot">
            <button className="chatbot-button" onClick={toggleChatWindow}>💬</button>
            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">Chatbot</div>
                    <div className="chat-body">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender}`}>
                            {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
      </div>
    );
};

