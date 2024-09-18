import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BillHistory from './BillHistory';
export default function ScheduledBillsTable() {

    const data = [
      { id: 1, name: 'Itmam Khan', amount: '$500', date: '12/09/2023', details: 'View details'},
      { id: 2, name: 'Andre Chiang', amount: '$600', date: '30/01/2022', details: 'View details'},
      { id: 3, name: 'Mitchell', amount: '$50000', date: '20/05/2009', details: 'View details'},
      { id: 4, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 5, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 6, name: 'Get Rich in 21 days LLC', amount: '$700000', date: '25/05/20011', details: 'View details'},
      { id: 7, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 8, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 9, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 10, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 11, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 12, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 13, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 14, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 15, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 16, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 17, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 18, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 19, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 20, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 21, name: 'Itmam Khan', amount: '$500', date: '12/09/2023', details: 'View details'},
      { id: 22, name: 'Andre Chiang', amount: '$600', date: '30/01/2022', details: 'View details'},
      { id: 23, name: 'Mitchell', amount: '$50000', date: '20/05/2009', details: 'View details'},
      { id: 24, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 25, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details'},
      { id: 26, name: 'Get Rich in 21 days LLC', amount: '$700000', date: '25/05/20011', details: 'View details'},
      { id: 27, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 28, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 29, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
      { id: 30, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details'},
    ];
  const [view, setView] = useState(false);
  const [currId, setCurrId] = useState(-1);
  function onClickLink(id) {
    setCurrId(id);
    setView(true);
  }

  return (
    <div className='scheduled-bills-table'>
    {!view && (
        <>
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.amount}</td>
                    <td>{row.date}</td>
                    <td>
                        <Link onClick={() => onClickLink(row.id)}>
                            {row.details}
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
        <BillHistory currId = {currId}/>
        <button className = 'scheduled-bill-history-button' onClick={() => setView(false)}>Back</button>
        </>
    )}
    </div>
  )
}
