import React, { useState } from 'react';
import './ViewAccounts.css';

export default function ViewAccounts() {
  const [active, setActive] = useState('profile');
  const [flipped, setFlipped] = useState(false);

  /* This is a proxy data. idk how the backend is storing their data, so if yall need me to make tweaks and shit. lmk */
  const savingsHistory = [
    { date: '2024-09-01', description: 'Deposit', amount: '$500' },
    { date: '2024-09-05', description: 'Withdrawal', amount: '-$200' },
    { date: '2024-09-10', description: 'Interest', amount: '-$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '-$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '-$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '-$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '-$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
  ];

  const transactionsHistory = [
    { date: '2024-09-02', description: 'Grocery Store', amount: '$50' },
    { date: '2024-09-06', description: 'Electricity Bill', amount: '-$100' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '-$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '-$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '-$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
  ];

/* more proxy data for backend to deal with. PLEASE let me know with ample time
if the formatting needs changing. */
  const user = {
    name: 'Fischer Zhang',
    username: 'FishyZ420',
    email: 'fischer.fish@fishbeswimmin.com.fsh'
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
          <div clasName={`sidebar-profile ${active === "profile" ? "sidebar-profile-active" : ""}`} onClick={() => onClickDiv("profile")}>
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
                  <button className="edit-profile">Edit Profile</button>
                </div>
                <div className="credit-card-container" onClick={flipCard}>
                  <div className={`credit-card ${flipped ? 'flipped' : ''}`}>
                    <div className="card-front">
                      <div className="card-header">
                        <div className="card-logo">VISA</div>
                        <div className="card-chip"></div>
                      </div>
                      <div className="card-number">1234 5678 9012 3456</div>
                      <div className="card-holder">
                        <span>Card Holder</span>
                        <div className="card-holder-name">Fischer Zhang</div>
                      </div>
                      <div className="card-expiry">
                        <span>Expires</span>
                        <div className="card-expiry-date">MM/YY</div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="card-info">
                        <div className="card-bsb">BSB: 123 456</div>
                        <div className="card-account-number">Account Number: 12345678</div>
                        <div className="card-cvv">CVV: 123</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {active === "savings" && (
              <>
                <h1>Balance: $30,000</h1>
              </>
            )}
            {active === "transactions" && (
              <>
                <h1>Balance: $30,000</h1>
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
