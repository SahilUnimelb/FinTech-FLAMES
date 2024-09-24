import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div> {/* Render the children components */}
    </div>
  );
}

