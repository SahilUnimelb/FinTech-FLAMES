import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Chatbot from '../ChatBot/Chatbot.jsx';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div> {/* Render the children components */}
      <Chatbot />
    </div>
  );
}

