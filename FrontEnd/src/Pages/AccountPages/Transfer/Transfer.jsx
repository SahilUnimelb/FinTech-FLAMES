import axios from 'axios';
import React, { useEffect, useState } from 'react';
import closeSign from '../../../Assets/close-button.svg';
import { Dropdown } from '../../../Components/Dropdown/Dropdown';
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
    totalRuns: "",
    scheduledDate: "",

  })
  const options = ["Pay or Transfer", "Scheduled Payments", "View Scheduled Bills", "Transfer Funds"]
  const [accountData] = useState(() => {
    const storedData = localStorage.getItem('accountData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [message, setMessage] = useState('');
  const flag = false;
  const [searchAccount, setSearchAccount] = useState('');
  
  const [searchPhone, setSearchPhone] = useState('');
  
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
  const [bankContacts, setBankContacts] = useState([]);
  const [payIdContacts, setPayIdContacts] = useState([]);

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
    if (active === 'Transfer Funds') {
        handleInternalTransfer();
    } else if (active === 'Pay or Transfer' && formData.transferMethod === "Bank Transfer") {
        handleBankTransfer();
    } else if (active === 'Pay or Transfer' && formData.transferMethod === "PayID") {
        handlePayIdTransfer();
    } else if (active === 'Scheduled Payments') {
        await handleScheduledTransfer();
    }
    setIsSubmitted(true);
  };
  
  const handleScheduledTransfer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions/schedulePayment', {
        fromAccountType: formData.fromAccountType,
        toAccNo: formData.accountNumber,
        toBsb: formData.bsb,
        amount: formData.amount,
        description: formData.description,
        scheduledDate: formData.scheduledDate || formData.date,
        frequency: formData.frequency,
        totalRuns: formData.totalRuns
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

  const [active, setActive] = useState(localStorage.getItem('active') || 'Pay or Transfer');

  useEffect(() => {
    localStorage.setItem('active', active);
  }, [active]);

  function onClickDiv(type) {
    setActive(type);
  }

  const [openBankContact, setOpenBankContact] = useState(false);

  const getBankContacts = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/accounts/getBankContacts', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setBankContacts(response.data);
    } catch (error) {
      console.error('Error fetching bank contacts:', error);
    }
  }; // Add token as a dependency if it's used inside the function
  
  const getPayIdContacts = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/accounts/getPayIdContacts', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setPayIdContacts(response.data);
    } catch (error) {
      console.error('Error fetching PayID contacts:', error);
    }
  };

  const filteredAccounts = bankContacts.filter(account =>
    account.name.toLowerCase().includes(searchAccount.toLowerCase())
  );
  const filteredPhones = payIdContacts.filter(phone =>
    phone.name.toLowerCase().includes(searchPhone.toLowerCase())
  );

  function onClickBankContact() {
    getBankContacts();
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
    getPayIdContacts();
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
                    <p> {account.accNo} </p>
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
                    <p> {phone.phoneNo} </p>
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
                <Dropdown active = {active} setActive = {setActive} options = {options} />
                <p>Move Money</p>
                <div className='mobile-view'>
                    ({active})
                </div>
        </div>
        <div className='transfer-section'>
            <div className='transfer-section-sidebar'>
                <div className={`transfer-section-sidebar-first-elem ${active === 'Pay or Transfer' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('Pay or Transfer')}}
                >
                    <p >Pay or Transfer</p>
                </div>
                <div className={`transfer-section-sidebar-second-elem ${active === 'Scheduled Payments' ? 'transfer-section-sidebar-second-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('Scheduled Payments')}}
                >
                    <p >Scheduled Payments</p>
                </div>
                <div className={`transfer-section-sidebar-third-elem ${active === 'View Scheduled Bills' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('View Scheduled Bills')}}
                >
                    <p >View Scheduled Bills</p>
                </div>
                <div className={`transfer-section-sidebar-first-elem ${active === 'Transfer Funds' ? 'transfer-section-sidebar-first-elem-active' : ''}`}
                     onClick = {() => {onClickDiv('Transfer Funds')}}
                >
                    <p >Transfer Funds</p>
                </div>
            </div>
            <div className='transfer-section-content'>
                {(active === 'Pay or Transfer' || active === 'Scheduled Payments') &&(
                    <>
                        <form onSubmit={handleSubmit}>
                            {flag && <p>{message}</p>}
                            <p className='transfer-section-content-header'>From:</p>
                            <span>
                                <label htmlFor='sender-account' className='transfer-section-content-sub-header'>Account</label>
                                <select
                                    id='sender-account'
                                    name='fromAccountType'
                                    value={formData.fromAccountType}
                                    //value={formData.senderAccount}
                                    onChange={handleChange}
                                    className='sender-account-select'
                                    required
                                >
                                    <option value="">-- Choose Account --</option>
                                    <option value="transaction">Transaction Account: {accountData ? "$" + accountData.transAccDetails.balance : 'Null Balance'}</option>
                                    <option value="savings">Savings Account: {accountData ? "$" + accountData.savingAccDetails.balance : 'Null Balance'}</option>
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
                            {active === 'Scheduled Payments' && (
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
                                    name="scheduledDate"
                                    value={formData.scheduledDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="transfer-date-input"
                                    required={!!formData.scheduleOption}
                                    />
                                </span>
                                {formData.scheduleOption === 'Recurring' && (
                                        <>
                                            <span>
                                                <label htmlFor='frequency-option' className='transfer-section-content-sub-header'>Frequency</label>
                                                <select
                                                    id='frequency-option'
                                                    name='frequency'
                                                    value={formData.frequency}
                                                    onChange={handleChange}
                                                    className='transfer-frequency-select'
                                                    required
                                                >
                                                    <option value="">-- Choose Frequency --</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="yearly">Yearly</option>
                                                </select>
                                            </span>
                                            {/* Total Runs */}
                                            <span>
                                                <label htmlFor='total-runs' className='transfer-section-content-sub-header'>Total Runs</label>
                                                <input
                                                    type="number"
                                                    id="total-runs"
                                                    name="totalRuns"
                                                    value={formData.totalRuns}
                                                    onChange={handleChange}
                                                    className='transfer-total-runs-input'
                                                    min="1"
                                                    required
                                                />
                                            </span>
                                        </>
                                    )}
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
            {active === 'View Scheduled Bills' && (
                <>
                <ScheduledBillsTable/>
                </>
            )}
            {active === 'Transfer Funds' && (
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
