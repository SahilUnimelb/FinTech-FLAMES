import axios from 'axios';
import { compareDesc, format, parse } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../../../Components/Dropdown/Dropdown';
import './ViewAccounts.css';

export default function ViewAccounts({active, setActive, onClickDiv}) {
  const options = ['Profile', 'Savings Account', 'Transactions Account']

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


  // Group the filtered transactions by month


  const TransactionTable = ({ transactions }) => {
    const rows = [...transactions];

    while (rows.length < 20) {
      rows.push({ date: '', description: '', amount: '' });
    }
    const [searchQuery, setSearchQuery] = useState('');
  const groupTransactionsByMonth = (transactions) => {
    // Sort transactions by date in descending order
    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
      const dateB = parse(b.date, 'dd/MM/yyyy', new Date());
      return compareDesc(dateA, dateB);
    });

    // Group transactions by month and year
    return sortedTransactions.reduce((groups, transaction) => {
      const parsedDate = parse(transaction.date, 'dd/MM/yyyy', new Date());
      const monthYear = format(parsedDate, 'MMMM yyyy');

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(transaction);

      return groups;
    }, {});
  };

  // Function to filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) {
      return transactions;
    }

    const query = searchQuery.trim().toLowerCase();

    // Check if the query matches a month name
    const isMonthSearch = transactions.some((txn) => {
      const parsedDate = parse(txn.date, 'dd/MM/yyyy', new Date());
      const monthName = format(parsedDate, 'MMMM').toLowerCase();
      return monthName === query;
    });

    if (isMonthSearch) {
      return transactions.filter((txn) => {
        const parsedDate = parse(txn.date, 'dd/MM/yyyy', new Date());
        const monthName = format(parsedDate, 'MMMM').toLowerCase();
        return monthName === query;
      });
    }

    // Check if the query matches a date format (DD/MM/YYYY)
    const isDateSearch = /^\d{2}\/\d{2}\/\d{4}$/.test(query);
    if (isDateSearch) {
      return transactions.filter((txn) => txn.date === query);
    }

    // If the query doesn't match month or date, return all transactions
    return transactions;
  }, [searchQuery, transactions]);
    const groupedTransactions = useMemo(() => {
      return groupTransactionsByMonth(filteredTransactions);
    }, [filteredTransactions]);
    return (
      <div className="transaction-table-container">
      {/* Search Input Field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by month (e.g., September) or date (e.g., 20/09/2024)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Transaction Table */}
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
            {Object.keys(groupedTransactions).length === 0 ? (
              <tr>
                <td colSpan="3" className="no-results">
                  No transactions found.
                </td>
              </tr>
            ) : (
              Object.keys(groupedTransactions).map((monthYear) => (
                <React.Fragment key={monthYear}>
                  {/* Month Header */}
                  <tr className="month-header">
                    <td colSpan="3">{monthYear}</td>
                  </tr>
                  {/* Transactions for the Month */}
                  {groupedTransactions[monthYear].map((transaction, index) => (
                    <tr key={index}>
                      <td className="transact-date">{transaction.date}</td>
                      <td className="transact-desc">{transaction.description}</td>
                      <td
                        className={`transact-amount ${
                          transaction.amount.startsWith('-') ? 'outgoing' : 'incoming'
                        }`}
                      >
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
  };

  return (
    <div className="view">
      <div className="view-header">
        <Dropdown active = {active} setActive = {setActive} options = {options} />
        <p>View Account</p>
        <div className='mobile-view'>
          ({active})
        </div>
      </div>
      <div className="view-container">
        <div className="view-sidebar">
          <div className={`sidebar-profile ${active === "Profile" ? "sidebar-profile-active" : ""}`} onClick={() => onClickDiv("Profile")}>
            <p>Profile</p>
          </div>
          <div className={`sidebar-savings ${active === "Savings Account" ? "sidebar-savings-active" : ""}`} onClick={() => onClickDiv("Savings Account")}>
            <p>Savings Account</p>
          </div>
          <div className={`sidebar-transactions ${active === "Transactions Account" ? "sidebar-transactions-active" : ""}`} onClick={() => onClickDiv("Transactions Account")}>
            <p>Transactions Account</p>
          </div>
        </div>
        <div className="view-content">
          <div className="view-balance">
            {active === "Profile" && (
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

          </div>
          <div className="history">
            {active === "Savings Account" && (
              <>
                <h1>Balance: ${accountData.savingAccDetails.balance}</h1>
                <h1>Saving History</h1>
                <TransactionTable transactions={savingsHistory} />
                <button className="print-pdf">Export as PDF</button>
              </>
            )}
            {active === "Transactions Account" && (
              <>
                <h1>Balance: ${accountData.transAccDetails.balance}</h1>
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
