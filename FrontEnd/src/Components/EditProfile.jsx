import React from 'react';
import './EditProfile.css';
import { Link } from 'react-router-dom';

export default function EditProfile() {
    return (
        <div className="edit-profile">
            <div className="edit-profile-container">
                <h1>Edit Profile</h1>
                <div className="edit-fields">
                    <p>Update Username:</p>
                    <input type="text" className="edit-username" placeholder="New username" />
                    <p>Update Name:</p>
                    <input type="text" className="edit-name" placeholder="New name"/>
                    <p>Update Email:</p>
                    <input type="text" className="edit-email" placeholder="New email"/>
                    <input type="text" className="confirm-new-password" placeholder="Confirm new email"/>
                    <Link to="/home"><button className="confirm-edits">Continue</button></Link>                    
                </div>
            </div>
        </div>
    )
}