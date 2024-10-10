// src/components/Chatbot.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Ensure Axios is installed: npm install axios
import './Chatbot.css'; // Ensure your CSS styles are properly set

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false); // For handling loading state
    const [error, setError] = useState(null); // For handling errors

    // Function to toggle the chat window visibility
    const toggleChatWindow = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Function to handle sending messages
    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return; // Do not send empty messages

        // Append the user's message to the chat
        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue(''); // Clear the input field
        setError(null); // Reset any previous errors

        // Optional: Show loading indicator
        setLoading(true);

        try {
            // Retrieve the JWT token from localStorage or your preferred storage
            const token = localStorage.getItem('token'); // Adjust based on your authentication setup

            // Send the user's message to the backend
            const response = await axios.post('http://localhost:5000/api/chatbot', {
                message: inputValue
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your backend requires it
                    Authorization: token ? `Bearer ${token}` : undefined
                }
            });

            // Extract the bot's response from the backend
            const botReply = response.data.responseMessage;

            // Append the bot's reply to the chat
            const botMessage = { text: botReply, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            console.error('Error communicating with chatbot:', error);
            // Handle errors and provide feedback to the user
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                const botMessage = { text: `Error: ${error.response.data.message}`, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            } else {
                setError('An unknown error occurred.');
                const botMessage = { text: 'An unknown error occurred. Please try again later.', sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            }
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Handle Enter key press to send messages
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
