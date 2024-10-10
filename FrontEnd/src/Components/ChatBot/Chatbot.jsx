import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');
        setError(null);
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:5000/api/chatbot', {
                message: inputValue
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : undefined
                }
            });

    
            const botReply = response.data.reply;

            const botMessage = { text: botReply || 'No reply.', sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.reply) {
                setError(error.response.data.reply); // Adjusted to match response structure
            } else {
                setError('An unknown error occurred.');
            }
            const botMessage = { text: error.response?.data?.reply || 'An unknown error occurred. Please try again later.', sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-bot">
            <button className="chatbot-button" onClick={toggleChatWindow}>💬</button>
            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Chatbot</span>
                        <button className="close-button" onClick={toggleChatWindow}>✖</button>
                    </div>
                    <div className="chat-body">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                        {loading && <div className="chat-message bot">Typing...</div>}
                        {error && <div className="chat-message bot error">{error}</div>}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
