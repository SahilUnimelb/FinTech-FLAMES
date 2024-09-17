import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewAccounts.css';

export default function ViewAccounts() {
  const [active, setActive] = useState('profile');
  const [flipped, setFlipped] = useState(false);
  const [message, setMessage] = useState('');
  const [accountData, setAccountData] = useState(() => {
    const storedData = localStorage.getItem('accountData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const flag = false;
  // Fetch user account details on component mount
  useEffect(() => {
    const fetchAccountDetails = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        setMessage('You are not logged in');
        return;
      }

      try {
        // Make a request to get the user account details
        const response = await axios.post('http://localhost:5000/api/accounts/getUser', {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        setAccountData(response.data); // Set the account data received from backend
        localStorage.setItem('accountData', JSON.stringify(response.data));
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message); // Display error message
        } else {
          setMessage('Failed to fetch account details. Please try again.');
        }
      }
    };

    fetchAccountDetails();
  }, []);

  function parseCardNumber(cardNumber) {
    return cardNumber.replace(/(.{4})/g, '$1 ');
  }

  function parseExpiryDate(month, year) {
    // Ensure the month is two digits (pad with zero if necessary)
    const formattedMonth = month.toString().padStart(2, '0');
    // Extract the last two digits of the year
    const formattedYear = year.toString().slice(-2);
    // Return the formatted string in MM/YY format
    return `${formattedMonth}/${formattedYear}`;
  }

  function parseBsb(bsb) {
    const bsbString = bsb.toString();
    return bsbString.replace(/(\d{3})(?=\d)/g, '$1 ');
  }

  function parseTransactions(transactions) {
    return transactions.map(transaction => {
      // Format the amount with a dollar sign and two decimal places
      const amountFormatted = transaction.amount < 0
        ? `-$${Math.abs(transaction.amount).toFixed(2)}`
        : `$${transaction.amount.toFixed(2)}`;

      // Format the date (assuming it's in ISO format)
      const dateFormatted = new Date(transaction.date).toLocaleDateString();

      return {
        date: dateFormatted,
        description: transaction.description || transaction.log, // Use description or log
        amount: amountFormatted
      };
    });
  }

  /* This is a proxy data. idk how the backend is storing their data, so if yall need me to make tweaks and shit. lmk */
  const savingsHistory = parseTransactions(accountData.savingAccDetails.transactions);

  const transactionsHistory = parseTransactions(accountData.transAccDetails.transactions);

/* more proxy data for backend to deal with. PLEASE let me know with ample time
if the formatting needs changing. */
  const user = {
    name: accountData.name,
    username: accountData.username,
    email: accountData.email
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  function onClickDiv(type) {
    setActive(type);
  }

  const TransactionTable = ({ transactions }) => {
    const rows = [...transactions];

    while (rows.length < 20) {
      rows.push({ date: '', description: '', amount: '' });
    }
    return (
      <div className="scrollable-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date of Transaction</th>
              <th>Description of Transaction</th>
              <th>Money Transferred</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="transact-date">{transaction.date}</td>
                <td className="transact-desc">{transaction.description}</td>
                <td className={`transact-amount ${transaction.amount.startsWith('-') ? 'outgoing' : 'incoming'}`}>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="view">
      <div className="view-header">
        <p>View Account</p>
      </div>
      <div className="view-container">
        <div className="view-sidebar">
          <div className={`sidebar-profile ${active === "profile" ? "sidebar-profile-active" : ""}`} onClick={() => onClickDiv("profile")}>
            <p>Profile</p>
          </div>
          <div className={`sidebar-savings ${active === "savings" ? "sidebar-savings-active" : ""}`} onClick={() => onClickDiv("savings")}>
            <p>Savings Account</p>
          </div>
          <div className={`sidebar-transactions ${active === "transactions" ? "sidebar-transactions-active" : ""}`} onClick={() => onClickDiv("transactions")}>
            <p>Transactions Account</p>
          </div>
        </div>
        <div className="view-content">
          <div className="view-balance">
            {active === "profile" && (
              <div className="profile-container">
                <div className="view-user-profile">
                  {flag && (
                    <>
                    {message}
                    </>
                  )}
                  <h1>Profile Details</h1>
                  <div className="view-user-info">
                    <label>Name:</label>
                    <span>{user.name}</span>
                  </div>
                  <div className="view-user-info">
                    <label>Username:</label>
                    <span>{user.username}</span>
                  </div>
                  <div className="view-user-info">
                    <label>Email:</label>
                    <span>{user.email}</span>
                  </div>
                  <Link to="/editprofile"><button className="edit-profile-button">Edit Profile</button></Link>
                </div>
                <div className="credit-card-container" onClick={flipCard}>
                  <div className={`credit-card ${flipped ? 'flipped' : ''}`}>
                    <div className="card-front">
                      <div className="card-header">
                        <div className="card-logo">VISA</div>
                        <div className="card-chip"></div>
                      </div>
                      <div className="card-number">{parseCardNumber(accountData.cardDetails.number)}</div>
                      <div className="card-holder">
                        <span>Card Holder</span>
                        <div className="card-holder-name">{accountData.name}</div>
                      </div>
                      <div className="card-expiry">
                        <span>Expires</span>
                        <div className="card-expiry-date">{parseExpiryDate(accountData.cardDetails.expiryMonth, accountData.cardDetails.expiryYear)}</div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="card-info">
                        <div className="card-bsb">BSB: {parseBsb(accountData.bsb)}</div>
                        <div className="card-account-number">Account Number: {accountData.accNo}</div>
                        <div className="card-cvv">CVV: {accountData.cardDetails.cvv}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {active === "savings" && (
              <>
                <div className='header'>
                  <h1>Balance: ${accountData.savingAccDetails.balance}</h1>
                </div>
              </>
            )}
            {active === "transactions" && (
              <>
                <div className='header'>
                <h1>Balance: ${accountData.transAccDetails.balance}</h1>
                </div>
              </>
            )}
          </div>
          <div className="history">
            {active === "savings" && (
              <>
                <h1>Transaction History</h1>
                <TransactionTable transactions={savingsHistory} />
                <button className="print-pdf">Export as PDF</button>
              </>
            )}
            {active === "transactions" && (
              <>
                <h1>Transaction History</h1>
                <TransactionTable transactions={transactionsHistory} />
                <button className="print-pdf">Export as PDF</button>
              </>
            )}
          {/* need to find a way to make the react-pdf attachement work*/}
          </div>
        </div>
      </div>
    </div>
  );
}
