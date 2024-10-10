import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminAccountTable.css';

export default function AdminAccountTable() {
    const data = [
        { id: 1, name: 'placeholder', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 2, name: 'andre', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 3, name: 'labib', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 4, name: 'fischer', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 5, name: 'john', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 6, name: 'Sahil', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 7, name: 'Sahil 2', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 8, name: 'Mitchell', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 9, name: 'Labib', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 10, name: 'Andre', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 11, name: 'Susan', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 12, name: 'Simone', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 13, name: 'tristan', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 14, name: 'hira', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 15, name: 'placeholder 2', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 16, name: 'place holder', username: 'place holder username', email: 'place holder email', edit: 'Edit'},
        { id: 17, name: 'placeholder3', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 18, name: 'placeholder', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 19, name: 'placeholder', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 20, name: 'placeholder', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'},
        { id: 21, name: 'placeholder', username: 'placeholder username', email: 'placeholder email', edit: 'Edit'}
    ];
    
    const [view, setView] = useState(false);
    const [currId, setCurrId] = useState(-1);
    const [searchTerm, setSearchTerm] = useState('');
    const [fundAmount, setFundAmount] = useState('');

    function onClickLink(id) {
        setCurrId(id);
        setView(true);
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    const handleFundAmountChange = (event) => {
        let value = event.target.value;
        if (value.includes('.')) {
            const parts = value.split('.');
            if (parts[1].length > 2) {
                value = `${parts[0]}.${parts[1].slice(0, 2)}`;
            }
        }
        setFundAmount(value);
    };    

    const handleBlur = () => {
        if (fundAmount) {
            setFundAmount(parseFloat(fundAmount).toFixed(2));
        }
    };

    const filteredData = data.filter(row => 
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='admin-info-table'>
            {!view && (
                <>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={handleSearch} 
                        className="search-bar"
                    />
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Edit Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.username}</td>
                                    <td>{row.email}</td>
                                    <td>
                                        <Link onClick={() => onClickLink(row.id)}>
                                            {row.edit}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {view && (
                <>
                    <div className="edit-page">
                        <div className="edit-funds">
                            <input 
                                type="number" 
                                placeholder="Input fund changes" 
                                className="fund-amount"
                                value={fundAmount}
                                onChange={handleFundAmountChange}
                                onBlur={handleBlur}
                                min="-9999"
                            />
                            <button className="edit-confirm">Confirm</button>
                        </div>
                        <div className="purge-account">
                            <button className="purge-account">Delete Account</button>
                        </div>
                        <button className='edit-return-button' onClick={() => setView(false)}>Back</button>
                    </div>
                </>
            )}
        </div>
    );
}
