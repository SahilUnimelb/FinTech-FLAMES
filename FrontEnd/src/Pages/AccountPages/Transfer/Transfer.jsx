import axios from 'axios';
import React, { useEffect, useState } from 'react';
import closeSign from '../../../Assets/close-button.svg';
import ScheduledBillsTable from '../../../Components/ScheduledBillsTable/ScheduledBillsTable';
import './Transfer.css';
export default function Transfer({accounts, phones, addContactDetails}) {
  const [formData, setFormData] = useState({
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
    fromAccountType: "",
    toAccountType: "",
    frequency: "",
    senderAccount: "",
    receiverAccount: "",

  })
  const [accountData] = useState(() => {
    const storedData = localStorage.getItem('accountData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [message, setMessage] = useState('');
  const flag = false;
  const [searchAccount, setSearchAccount] = useState('');
  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchAccount.toLowerCase())
  );
  const [searchPhone, setSearchPhone] = useState('');
  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchPhone.toLowerCase())
  );
  const token = localStorage.getItem('authToken');
  function handleChange (event) {
    const {name, value} = event.target;
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountExists = accounts.some(account =>
    (account.accountNumber === formData.accountNumber));
    const phoneExists = phones.some(phone =>
        phone.phoneNumber === formData.phoneNumber
    );
    if (!accountExists && !phoneExists) {
        addContactDetails(formData);
    }
    console.log(formData);
    if (active === 'transfer') {
        handleInternalTransfer();
    } else if (active === 'pay' && formData.transferMethod === "Bank Transfer") {
        handleBankTransfer();
    } else if (active === 'pay' && formData.transferMethod === "PayID") {
        handlePayIdTransfer();
    }
    setIsSubmitted(true);
  };

  const handleInternalTransfer = async () => {
    try {

      const response = await axios.post('http://localhost:5000/api/transactions/transfer/within', {
        fromAccountType: formData.senderAccount,
        toAccountType: formData.receiverAccount,
        amount: formData.amount,
        description: formData.description
      }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`${error.response.data.message}`);
      } else {
        setMessage('An unknown error occurred');
      }
    }
  };

  const handleBankTransfer = async () => {
    try{
        const response = await axios.post('http://localhost:5000/api/transactions/transfer', {
            toAccNo: formData.accountNumber,
            toBsb: formData.bsb,
            amount: formData.amount,
            description: formData.description,
            name: formData.name
          }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
          });

        setMessage(response.data.message);
    } catch(error) {
        if (error.response && error.response.data && error.response.data.message) {
            setMessage(`${error.response.data.message}`);
        } else {
            setMessage('An unknown error occurred');
        }
    }

  }

  const handlePayIdTransfer = async () => {
    try{
        const response = await axios.post('http://localhost:5000/api/transactions/payIdTransfer', {
            toPhoneNo: formData.phoneNumber,
            amount: formData.amount,
            description: formData.description
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        setMessage(response.data.message);
    } catch(error) {
        if (error.response && error.response.data && error.response.data.message) {
            setMessage(`${error.response.data.message}`);
        } else {
            setMessage('An unknown error occurred');
        }
    }
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const closeModal = () => {
    setIsSubmitted(false);
  };

  const [active, setActive] = useState(localStorage.getItem('active') || 'pay');

  useEffect(() => {
    localStorage.setItem('active', active);
  }, [active]);

  function onClickDiv(type) {
    setActive(type);
  }

  const [openBankContact, setOpenBankContact] = useState(false);

  function onClickBankContact() {
    setSearchAccount('');
    setOpenBankContact(true);
  }

  function onClickClose () {
    setOpenBankContact(false);
    setOpenPhoneContact(false);
    setSearchAccount('');
    setSearchPhone('');
  }

  const [openPhoneContact, setOpenPhoneContact] = useState(false);

  function onClickPhoneContact() {
    setSearchPhone('');
    setOpenPhoneContact(true);
  }
  function fillUpFormBank (account) {
    setFormData(prevFormData => ({
        ...prevFormData,
        name: account.name,
        bsb: account.bsb,
        accountNumber: account.accountNumber
      }));
      setOpenBankContact(false);
  }

  function fillUpFormPhone(phone) {
    setFormData(prevFormData => ({
        ...prevFormData,
        name: phone.name,
        phoneNumber: phone.phoneNumber
      }));
      setOpenPhoneContact(false);
  }

  useEffect(() => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        name: "",
        bsb: "",
        accountNumber:"",
        phoneNumber:""
    })
    )
  }, [formData.transferMethod])

  const ContactListBank = () => {
    return (
        <div className='transfer-contact-list-overlay'>
          <div className='transfer-contact-list-content'>
            <div className='transfer-contact-list-content-header'>
                <p>Contact List</p>
                <img src={closeSign} alt='' onClick={onClickClose}/>
            </div>
            <div className='transfer-contact-search'>
            <input
                type="text"
                placeholder="Search by name"
                value={searchAccount}
                onChange={(e) => setSearchAccount(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>
            <div className='transfer-contact-list'>
            <div className='transfer-contact-list-header'>
                <p>Name</p>
                <p>BSB</p>
                <p>Account Number</p>
            </div>

            <div className='transfer-contact-list-body'>
                {filteredAccounts.map((account) => {
                return (
                    <div key={account.id}
                    className='transfer-contact-list-individual'
                    onClick = {() => {fillUpFormBank(account)}} >
                    <p> {account.name} </p>
                    <p> {account.bsb} </p>
                    <p> {account.accountNumber} </p>
                    </div>
                )
                })}
            </div>
            </div>

          </div>

        </div>
    )
  }

  const ContactListPhone = () => {
    return (
        <div className='transfer-contact-list-overlay'>
          <div className='transfer-contact-list-content'>
            <div className='transfer-contact-list-content-header'>
                <p>Contact List</p>
                <img src={closeSign} alt='' onClick={onClickClose}/>
            </div>
            <div className='transfer-contact-search'>
            <input
                type="text"
                placeholder="Search by Name"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>
            <div className='transfer-contact-list'>
            <div className='transfer-contact-list-header'>
                <p>Name</p>
                <p>Phone Number</p>
            </div>

            <div className='transfer-contact-list-body'>
                {filteredPhones.map((phone) => {
                return (
                    <div key={phone.id}
                    className='transfer-contact-list-individual'
                    onClick = {() => {fillUpFormPhone(phone)}} >
                    <p> {phone.name} </p>
                    <p> {phone.phoneNumber} </p>
                    </div>
                )
                })}
            </div>
            </div>
          </div>
        </div>
    )
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
                <div className={`transfer-section-sidebar-first-elem ${active === 'transfer' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('transfer')}}
                >
                    <p >Transfer Funds</p>
                </div>
            </div>
            <div className='transfer-section-content'>
                {(active === 'pay' || active === 'schedule') &&(
                    <>
                        <form onSubmit={handleSubmit}>
                            {flag && <p>{message}</p>}
                            <p className='transfer-section-content-header'>From:</p>
                            <span>
                                <label htmlFor='sender-account' className='transfer-section-content-sub-header'>Account</label>
                                <select
                                    id='sender-account'
                                    name='senderAccount'
                                    //value={formData.senderAccount}
                                    onChange={handleChange}
                                    className='sender-account-select'
                                    required
                                >
                                    <option value="">-- Choose Account --</option>
                                    <option value="">Transaction Account: {accountData ? "$" + accountData.transAccDetails.balance : 'Null Balance'}</option>
                                    <option value="">Savings Account: {accountData ? "$" + accountData.savingAccDetails.balance : 'Null Balance'}</option>
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
                                            type="number"
                                            placeholder="BSB"
                                            onChange={handleChange}
                                            name="bsb"
                                            value={formData.bsb}
                                            className="transfer-receiver-details"
                                            min={100000}  // Ensures BSB is at least 5 digits
                                            max={999999}  // Ensures BSB is at most 5 digits
                                            pattern="\d{5}"
                                            title="Please enter exactly 5 digits"
                                            required
                                        />
                                </span>
                                <span>
                                    <p className='transfer-section-content-sub-header'>Account Number</p>
                                        <input
                                            type="number"
                                            placeholder="Account Number"
                                            onChange={handleChange}
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            className="transfer-receiver-details"
                                            min={10000000}  // Ensures account number is at least 8 digits
                                            max={99999999}  // Ensures account number is at most 8 digits
                                            pattern="\d{8}"
                                            title="Please enter exactly 8 digits"
                                            required
                                        />
                                </span>
                                <div className='transfer-section-contact-button-wrapper'>
                                    <button  type='button' onClick={onClickBankContact}>Choose From Contacts</button>
                                </div>
                                </>
                            )}

                            <>
                            {openBankContact && (
                                <ContactListBank/>
                            )}
                            </>

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
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            className="transfer-receiver-details"
                                            maxLength={10}
                                            pattern="\d{10}"
                                            title="Please enter exactly 10 digits"
                                            required
                                        />
                                </span>
                                <div className='transfer-section-contact-button-wrapper'>
                                    <button onClick={onClickPhoneContact}>Choose From Contacts</button>
                                </div>
                                </>
                            )}
                            <>
                            {openPhoneContact && (
                                <ContactListPhone/>
                            )}
                            </>
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
                                    min={new Date().toISOString().split("T")[0]}
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
            {isSubmitted && (
                <div className="modal-overlay">
                <div className="modal-content">
                    <img src = {closeSign} alt='' onClick={closeModal}/>
                    <p>{message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
                </div>
            )}
            {active === 'view' && (
                <>
                <ScheduledBillsTable/>
                </>
            )}
            {active === 'transfer' && (
                <>
                <div className='transfer-section-content'>
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
                                <option value="transaction">Transaction Account: {accountData ? "$" + accountData.transAccDetails.balance : 'Null Balance'}</option>
                                <option value="savings">Savings Account: {accountData ? "$" + accountData.savingAccDetails.balance : 'Null Balance'}</option>
                            </select>
                        </span>
                        <p className='transfer-section-content-header'>From:</p>
                        <span>
                            <label htmlFor='receiver-account' className='transfer-section-content-sub-header'>To</label>
                            <select
                                id='receiver-account'
                                name='receiverAccount'
                                value={formData.receiverAccount}
                                onChange={handleChange}
                                className='sender-account-select'
                                required
                            >
                                <option value="">-- Choose Account --</option>
                                <option value="transaction">Transaction Account: {accountData ? "$" + accountData.transAccDetails.balance : 'Null Balance'}</option>
                                <option value="savings">Savings Account: {accountData ? "$" + accountData.savingAccDetails.balance : 'Null Balance'}</option>
                            </select>
                        </span>
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
                        <div className='transfer-section-button-wrapper'>
                            <button type='submit'>Pay</button>
                        </div>
                    </form>
                </div>
                </>
            )}
        </div>
    </div>
  )
}