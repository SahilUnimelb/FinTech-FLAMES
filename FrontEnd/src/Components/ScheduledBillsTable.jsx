import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BillHistory from './BillHistory';
export default function ScheduledBillsTable() {

    const data = [
        { id: 1, name: 'Itmam Khan', amount: '$500', date: '12/09/2023', details: 'View details' },
        { id: 2, name: 'Andre Chiang', amount: '$600', date: '30/01/2022', details: 'View details' },
        { id: 3, name: 'Mitchell', amount: '$50000', date: '20/05/2009', details: 'View details' },
        { id: 4, name: 'Fischer Table Tennis LTD', amount: '$80000', date: '14/09/2024', details: 'View details' },
        { id: 5, name: 'Sahil Khatri', amount: '$2000', date: '01/10/2019', details: 'View details' },
        { id: 6, name: 'Get Rich in 21 days LLC', amount: '$700000', date: '25/05/2011', details: 'View details' },
        { id: 7, name: 'Jessica Forbes', amount: '$300', date: '18/02/2021', details: 'View details' },
        { id: 8, name: 'Maria Johnson', amount: '$1000', date: '04/07/2020', details: 'View details' },
        { id: 9, name: 'Xavier Automotive', amount: '$15000', date: '13/08/2018', details: 'View details' },
        { id: 10, name: 'ABC Enterprises', amount: '$5000', date: '06/11/2022', details: 'View details' },
        { id: 11, name: 'Daniel Smith', amount: '$1200', date: '17/09/2015', details: 'View details' },
        { id: 12, name: 'Elite Builders LLC', amount: '$95000', date: '02/03/2023', details: 'View details' },
        { id: 13, name: 'Horizon Tech', amount: '$62000', date: '10/12/2014', details: 'View details' },
        { id: 14, name: 'Kimberly Wright', amount: '$800', date: '29/06/2017', details: 'View details' },
        { id: 15, name: 'David Thompson', amount: '$350', date: '05/01/2021', details: 'View details' },
        { id: 16, name: 'Quantum Solutions', amount: '$23000', date: '11/04/2016', details: 'View details' },
        { id: 17, name: 'Ocean View Resort', amount: '$450000', date: '09/09/2019', details: 'View details' },
        { id: 18, name: 'Innovative Design Studio', amount: '$120000', date: '15/12/2022', details: 'View details' },
        { id: 19, name: 'Matthew Cooper', amount: '$1100', date: '21/11/2011', details: 'View details' },
        { id: 20, name: 'Phoenix Corp', amount: '$76000', date: '26/05/2020', details: 'View details' }
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
