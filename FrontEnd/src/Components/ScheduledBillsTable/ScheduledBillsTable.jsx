import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BillHistory from '../../Pages/AccountPages/BillHistory/BillHistory';
import './ScheduledBillsTable.css';
export default function ScheduledBillsTable() {

  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [currBill, setCurrBill] = useState(null);
  const token = localStorage.getItem('authToken');
  function onClickLink(bill) {
    setCurrBill(bill);
    setView(true);
  }

  const getScheduledBills = useCallback(async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/transactions/getScheduledPayments', {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const formattedResponse = response.data.scheduledPayments.map((bills, index) => {
            const date = new Date(bills.startDate);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

            return {
                id: index + 1,  // Create an artificial id
                name: bills.name,
                amount: bills.amount,
                date: formattedDate,
                details: 'View details',
                ...bills
            };
        });
        console.log("FORMATTED RESPONSE: ", formattedResponse);
        setData(formattedResponse);
    } catch (error) {
        console.error('Error fetching scheduled bills: ', error);
    }
  }, [token]);

  useEffect(() => {
    getScheduledBills();
}, [getScheduledBills]);

function handleNextPaymentLogic(bill) {
    const date = new Date(bill.startDate);
    const completedCount = bill.completedCount

    if(bill.type === "once") {
        return bill.date;
    }
    else if (bill.type === "recurring"){
        let nextPaymentDate = new Date(bill.startDate);
        console.log("BILL: ", bill)
        let dateString = "";
        if (bill.frequency === "weekly") {
            nextPaymentDate.setDate(date.getDate() + (7 * (completedCount)));
            dateString = dateString = nextPaymentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        else if (bill.frequency === "monthly") {
            nextPaymentDate.setMonth(date.getMonth() + (completedCount));
            dateString = dateString = nextPaymentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        else if (bill.frequency === "yearly") {
            nextPaymentDate.setFullYear(date.getFullYear() + (completedCount));
            dateString = dateString = nextPaymentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        return dateString;
    }
}

function handleFrequencyDisplay(bill) {
    if(bill.type === "once") {
        return "One Time Payment";
    }
    else if(bill.type === "recurring") {
        return bill.frequency.charAt(0).toUpperCase() + bill.frequency.slice(1);
    }
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
                    <th>Next Payment</th>
                    <th>Frequency</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>${row.amount}</td>
                    <td>{handleNextPaymentLogic(row)}</td>
                    <td>{handleFrequencyDisplay(row)}</td>
                    <td>
                        <Link onClick={() => onClickLink(row)}>
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
        <BillHistory currBill = {currBill}/>
        <button className = 'scheduled-bill-history-button' onClick={() => setView(false)}>Back</button>
        </>
    )}
    </div>
  )
}
