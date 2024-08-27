import React from 'react';

export default function Account() {
  return (
    <div className="account">
      <div className="account-container">
        <div className="account-balance">
          <div className="savings-account">
            <h1>Savings Account</h1>
            <h2 className="saving-funds">[insert funds here]</h2>
          </div>
          <div className="transaction-account">
            <h1>Transaction Account</h1>
            <h2 className="transaction-funds">[insert funds here]</h2>
          </div>
        </div>
        <div className="transactions">

        </div>
        <button className="make-payment">Payment</button>

      </div>
    </div>
  )
}
