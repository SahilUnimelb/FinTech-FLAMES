import React, { useState } from 'react';
import './ViewAccounts.css';

export default function ViewAccounts() {
  const [active, setActive] = useState('savings');

  /* This is a proxy data. idk how the backend is storing their data, so if yall need me to make tweaks and shit. lmk */
  const savingsHistory = [
    { date: '2024-09-01', description: 'Deposit', amount: '$500' },
    { date: '2024-09-05', description: 'Withdrawal', amount: '$200' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
    { date: '2024-09-10', description: 'Interest', amount: '$5' },
  ];

  const transactionsHistory = [
    { date: '2024-09-02', description: 'Grocery Store', amount: '$50' },
    { date: '2024-09-06', description: 'Electricity Bill', amount: '$100' },
    { date: '2024-09-12', description: 'Online Shopping', amount: '$150' },
  ];

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
                <td className="transact-amount">{transaction.amount}</td>
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
          <div className={`sidebar-savings ${active === "savings" ? "sidebar-savings-active" : ""}`} onClick={() => onClickDiv("savings")}>
            <p>Savings Account</p>
          </div>
          <div className={`sidebar-transactions ${active === "transactions" ? "sidebar-transactions-active" : ""}`} onClick={() => onClickDiv("transactions")}>
            <p>Transactions Account</p>
          </div>
        </div>
        <div className="view-content">
          {active === "savings" && (
            <>
              <h1>Savings Account History</h1>
              <TransactionTable transactions={savingsHistory} />
            </>
          )}
          {active === "transactions" && (
            <>
              <h1>Transactions Account History</h1>
              <TransactionTable transactions={transactionsHistory} />
            </>
          )}
          <button className="print-pdf">Export as PDF</button>
        </div>
      </div>
    </div>
  );
}
