import React from 'react'

export default function BillHistory({currId}) {
  return (
    <div>
        <p className='bill-history-header'>BillHistory, show: {currId}</p>
        <p className='bill-history-details'>Name:</p>
        <p className='bill-history-details'>BSB:</p>
        <p className='bill-history-details'>Account Number:</p>
        <p className='bill-history-details'>Phone Number:</p>
        <p className='bill-history-details'>Amount:</p>
        <p className='bill-history-details'>Date:</p>
        <p className='bill-history-details'>Time:</p>
        <p className='bill-history-details'>Next Payment Scheduled:</p>
        <p className='bill-history-details'>Number of Payments remaining:</p>
    </div>
  )
}
