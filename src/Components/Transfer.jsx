import React, { useState } from 'react';
import ScheduledBillsTable from './ScheduledBillsTable';
export default function Transfer() {
  const [formData, setFormData] = useState({
    senderAccount: "",
    transferMethod: "",
    amount: "",
    description: "",
    name: "",
    bsb: "",
    accountNumber: "",
    phoneNumber: "",
    scheduleOption: "",
    date: "",
    recurring: "",
    frequency: ""
  })

  function handleChange (event) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setIsSubmitted(true);
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const closeModal = () => {
    setIsSubmitted(false);
  };

  const [active, setActive] = useState('pay');
  function onClickDiv(type) {
    setActive(type);
  }
  return (
    <div className='transfer'>
        <div className='transfer-header'>
                <p>Move Money</p>
        </div>
        <div className='transfer-section'>
            <div className='transfer-section-sidebar'>
                <div className={`transfer-section-sidebar-first-elem ${active === 'pay' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('pay')}}
                >
                    <p >Pay or Transfer</p>
                </div>
                <div className={`transfer-section-sidebar-second-elem ${active === 'schedule' ? 'transfer-section-sidebar-second-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('schedule')}}
                >
                    <p >Scheduled Payments</p>
                </div>
                <div className={`transfer-section-sidebar-third-elem ${active === 'view' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('view')}}
                >
                    <p >View Scheduled Bills</p>
                </div>
            </div>
            <div className='transfer-section-content'>
                {(active === 'pay' || active === 'schedule') &&(
                    <>
                        <form onSubmit={handleSubmit}>
                            <p className='transfer-section-content-header'>From:</p>
                            <span>
                                <label htmlFor='sender-account' className='transfer-section-content-sub-header'>Account</label>
                                <select
                                    id='sender-account'
                                    name='senderAccount'
                                    value={formData.senderAccount}
                                    onChange={handleChange}
                                    className='sender-account-select'
                                    required
                                >
                                    <option value="">-- Choose Account --</option>
                                    <option value="063786 48543425213">Transaction Account: $30,000</option>
                                    <option value="063123 4857252935">Savings Account: $30,000</option>
                                </select>
                            </span>
                            <p className='transfer-section-content-header'>To:</p>
                            <span>
                                <label htmlFor='transfer-option' className='transfer-section-content-sub-header'>Transfer Options</label>
                                <select
                                    id='transfer-option'
                                    name='transferMethod'
                                    value={formData.transferMethod}
                                    onChange={handleChange}
                                    className='transfer-method-select'
                                    required
                                >
                                    <option value="">-- Choose Method --</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="PayID">PayID</option>
                                    <option value="BPay">BPay</option>
                                </select>
                            </span>
                            {formData.transferMethod === "Bank Transfer" && (
                                <>
                                <span>
                                    <p className='transfer-section-content-sub-header'>Name</p>
                                        <input
                                            type="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            name="name"
                                            value={formData.name}
                                            className="transfer-receiver-details"
                                            required
                                        />
                                </span>
                                <span>
                                    <p className='transfer-section-content-sub-header'>BSB</p>
                                        <input
                                            type="text"
                                            placeholder="BSB"
                                            onChange={handleChange}
                                            name="bsb"
                                            value={formData.bsb}
                                            className="transfer-receiver-details"
                                            maxLength={5}
                                            pattern="\d{5}"
                                            title="Please enter exactly 5 digits"
                                            required
                                        />
                                </span>
                                <span>
                                    <p className='transfer-section-content-sub-header'>Account Number</p>
                                        <input
                                            type="text"
                                            placeholder="Account Number"
                                            onChange={handleChange}
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            className="transfer-receiver-details"
                                            maxLength={8}
                                            pattern="\d{8}"
                                            title="Please enter exactly 8 digits"
                                            required
                                        />
                                </span>
                                </>
                            )}
                            {formData.transferMethod === "PayID" && (
                                <>
                                <span>
                                    <p className='transfer-section-content-sub-header'>Name</p>
                                        <input
                                            type="name"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            name="name"
                                            value={formData.name}
                                            className="transfer-receiver-details"
                                            required
                                        />
                                </span>
                                <span>
                                    <p className='transfer-section-content-sub-header'>Phone Number</p>
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            onChange={handleChange}
                                            name="accountNumber"
                                            value={formData.phoneNumber}
                                            className="transfer-receiver-details"
                                            maxLength={10}
                                            pattern="\d{10}"
                                            title="Please enter exactly 10 digits"
                                            required
                                        />
                                </span>
                                </>
                            )}
                            <p className='transfer-section-content-header'>Payment Details:</p>
                            <span>
                                <p className='transfer-section-content-sub-header'>Amount</p>
                                <div className='transfer-amount-wrapper'>
                                    <span className='currency-symbol'>$</span>
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            onChange={handleChange}
                                            name="amount"
                                            value={formData.amount}
                                            className="transfer-amount-input"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                </div>
                            </span>
                            <span>
                            <p className='transfer-section-content-sub-header'>Description (Optional)</p>
                                <textarea
                                    placeholder="Description (Optional)"
                                    onChange={handleChange}
                                    name="description"
                                    value={formData.description}
                                    className="transfer-description-textarea"
                                />
                            </span>
                            {active === 'schedule' && (
                                <>
                                <span>
                                <label htmlFor='schedule-option' className='transfer-section-content-sub-header'>Schedule Options</label>
                                <select
                                    id='schedule-option'
                                    name='scheduleOption'
                                    value={formData.scheduleOption}
                                    onChange={handleChange}
                                    className='transfer-schedule-select'
                                >
                                    <option value="">-- Choose Option --</option>
                                    <option value="Once">Once</option>
                                    <option value="Recurring">Recurring</option>
                                </select>
                                </span>
                                <span>
                                <p className='transfer-section-content-sub-header'>Start Date</p>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]} // Sets the minimum date to today
                                    className="transfer-date-input"
                                    required={!!formData.scheduleOption}
                                    />
                                </span>
                                <span>
                                <label htmlFor='recurring-option' className='transfer-section-content-sub-header'>Schedule Options</label>
                                <select
                                    id='recurring-option'
                                    name='recurring'
                                    value={formData.recurring}
                                    onChange={handleChange}
                                    className='transfer-recurring-select'
                                    required={!!formData.scheduleOption}
                                >
                                    <option value="">-- Choose Option --</option>
                                    <option value="Never">Never</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                </span>
                                <span>
                                <label htmlFor='frequency-option' className='transfer-section-content-sub-header'>Frequency</label>
                                <select
                                    id='frequency-option'
                                    name='frequency'
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    className='transfer-frequency-select'
                                >
                                    <option value="">-- Choose Option --</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                                </span>
                                </>
                            )}
                            <div className='transfer-section-button-wrapper'>
                                <button type='submit'>Pay</button>
                            </div>
                        </form>
                    </>
                    )
                }


            </div>
            {active === 'view' && (
                    <>
                    <ScheduledBillsTable/>
                    </>
                )}
            {isSubmitted && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <p>Payment sent successfully!</p>
                    <button onClick={closeModal}>Close</button>
                </div>
                </div>
            )}
        </div>
    </div>
  )
}
