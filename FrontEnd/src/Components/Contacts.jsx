import React, { useState } from 'react';
import addSign from '../Assets/add-sign.svg';
import closeSign from '../Assets/close-button.svg';
import crossSign from '../Assets/cross-icon.svg';

export default function Contacts() {

  const [accounts, setAccounts] = useState([
    { id: 1, name: "Jackson Williams", bsb: "953248", accountNum: "88293680" },
    { id: 2, name: "Jackson Johnson", bsb: "460846", accountNum: "84140165" },
    { id: 3, name: "Jackson Smith", bsb: "793160", accountNum: "82949178" },
    { id: 4, name: "Jackson Jones", bsb: "235972", accountNum: "88960684" },
    { id: 5, name: "Jackson Smith", bsb: "854628", accountNum: "43667333" },
    { id: 6, name: "Jackson Williams", bsb: "555418", accountNum: "70599594" },
    { id: 7, name: "Jackson Jones", bsb: "993620", accountNum: "65792614"},
    { id: 8, name: "Jackson Jones", bsb: "187142", accountNum: "85752163" },
    { id: 9, name: "Jackson Brown", bsb: "461988", accountNum: "27744551" },
    { id: 10, name: "Jackson Williams", bsb: "324604", accountNum: "65487411" },
  ].sort((a, b) => a.name.localeCompare(b.name)))

  const [phones, setPhones] = useState([
    { id: 1, name: "Jackson Williams", phoneNum: "0274893621" },
    { id: 2, name: "Jackson Johnson", phoneNum: "0412758390" },
    { id: 3, name: "Jackson Smith", phoneNum: "0487261538" },
    { id: 4, name: "Jackson Jones", phoneNum: "0354918276" },
    { id: 5, name: "Jackson Brown", phoneNum: "0192837465" },
    { id: 6, name: "Jackson White", phoneNum: "0678123456" },
    { id: 7, name: "Jackson Taylor", phoneNum: "0743658912" },
    { id: 8, name: "Jackson Davis", phoneNum: "0283746591" },
    { id: 9, name: "Jackson Miller", phoneNum: "0365289174" },
    { id: 10, name: "Jackson Wilson", phoneNum: "0456789123" }
  ].sort((a, b) => a.name.localeCompare(b.name)))

  const [active, setActive] = useState('bank');
  function onClickDiv(type) {
    setActive(type);
  }

  const [isAdd, setIsAdd] = useState(false);
  const [isExits, setIsExist] = useState(false);

  const [contactData, setContactData] = useState({
    contactType:"",
    name:"",
    bsb:"",
    accountNum:"",
    phoneNum:""
  });

  function handleChange (event) {
    const {name, value} = event.target;
    setContactData(
      prevContactData => {
        return {
          ...prevContactData,
          [name]:value
        }
      }
    );
  };

  function addContactDetailsBank () {
    const newAccount = {
      id: Date.now(),
      name: contactData.name,
      bsb: contactData.bsb,
      accountNum: contactData.accountNum,
    }
    setAccounts(prevAccounts => {
      const updatedAccounts = [...prevAccounts, newAccount];
      updatedAccounts.sort((a, b) => a.name.localeCompare(b.name));
      return updatedAccounts;
    });
  }

  function addContactDetailsPhone() {
    const newPhone = {
      id: Date.now(),
      name: contactData.name,
      phoneNum: contactData.phoneNum
    }
    setPhones(prevPhones => {
      const updatedPhones = [...prevPhones, newPhone];
      updatedPhones.sort((a, b) => a.name.localeCompare(b.name));
      return updatedPhones;
    });
  };
  function addContactDetails() {
    setIsExist(false);
    if (contactData.bsb) {
      addContactDetailsBank();
    }
    else if (contactData.phoneNum) {
      addContactDetailsPhone();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accountExists = accounts.some(account =>
    (account.bsb === contactData.bsb &&
      account.accountNum === contactData.accountNum));
    const phoneExists = phones.some(phone =>
      phone.phoneNum === contactData.phoneNum
    );
    if (accountExists || phoneExists) {
      setIsExist(true)
      return;
    }
    addContactDetails();
    console.log(contactData);
    console.log(accounts);
    console.log(phones);
    emptyForm();
  }

  function onClickClose () {
    setIsAdd(false);
    emptyForm();
  }

  function emptyForm() {
    setContactData({
      contactType: "",
      name: "",
      bsb: "",
      accountNum: "",
      phoneNum: ""
    })
  }
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [removeMessage, setRemoveMessage] = useState(false);

  function onClickRemoveAccount(account) {
    setSelectedAccount(account);
    setRemoveMessage(true);
  }

  function onClickRemoveClose() {
    setSelectedAccount(null)
    setRemoveMessage(false)
  }

  function removeAccount(selectedAccount) {
    if (selectedAccount.bsb) {
      setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== selectedAccount.id));
    }
    else if (selectedAccount.phoneNum) {
      setPhones(prevAccounts => prevAccounts.filter(account => account.id !== selectedAccount.id));
    }
    setRemoveMessage(false);
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <p className='contact-header-left'>Contact List</p>
        <div className="hover-div">
        <img
            src={addSign}
            alt=''
            onClick={() => {
            setIsAdd(true);
            setIsExist(false);
            }}
          />
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-sidebar">
          <div className={`sidebar-bank ${active === "bank" ? "sidebar-bank-active" : ""}`} onClick={() => onClickDiv("bank")}>
            <p>Bank account</p>
          </div>
          <div className={`sidebar-phone ${active === "phone" ? "sidebar-phone-active" : ""}`} onClick={() => onClickDiv("phone")}>
            <p>Phone</p>
          </div>
        </div>
        <div className="contact-content">
          {active === "bank" && (
            <>
            {accounts.length> 0 && (
              <>
              {accounts.map((account) =>{
                return <div key = {account.id}>
                  <h3> {account.name} </h3>
                  <p> BSB: {account.bsb} </p>
                  <p> Account Number: {account.accountNum}</p>
                  <img src= {crossSign} alt='' onClick={() => onClickRemoveAccount(account)} />
                </div>
              })}
              </>
            )}
            {accounts.length === 0 && (
              <>
              No Contacts!
              </>
            )}
            </>
          )}
          {active === "phone" && (
            <>
            {phones.length> 0 && (
              <>
              {phones.map((phone) => {
                  return <div key = {phone.id}>
                    <h3> {phone.name} </h3>
                    <p> {phone.phoneNum} </p>
                    <img src= {crossSign} alt='' onClick={() => onClickRemoveAccount(phone)} />
                  </div>
              })}
              </>
            )}
            {phones.length === 0 && (
              <>
              No Contacts!
              </>
            )}
            </>
          )}
          {removeMessage && (
            <>
              <div className='remove-form-overlay'>
              <div className='remove-form-content'>
              <img src={closeSign} alt='' onClick={onClickRemoveClose}/>
                <p>Are you sure you want to remove
                  <span className="highlight-name"> {selectedAccount.name} </span>
                from your contacts?</p>
                <button onClick={() => removeAccount(selectedAccount)}>Remove</button>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isAdd && (
        <>
          <div className='contact-form-overlay'>
          <div className='contact-form-content'>
            <div className='contact-form-header'>
              <p>Fill Contact</p>
              <img src={closeSign} alt='' onClick={onClickClose}/>
            </div>
            <form onSubmit={handleSubmit}>
            <span>
                    <label htmlFor='contact-type' className='contact-type'>Transfer Options</label>
                    <select
                        id='contact-type'
                        name='contactType'
                        value={contactData.contactType}
                        onChange={handleChange}
                        className='contact-type-select'
                        required
                    >
                        <option value="">-- Choose Method --</option>
                        <option value="Bank">Bank</option>
                        <option value="Phone">Phone</option>
                    </select>
                </span>
                {contactData.contactType === "Bank" && (
                      <>
                      <span>
                          <p className='contact-name'>Name</p>
                              <input
                                  type="name"
                                  placeholder="Name"
                                  onChange={handleChange}
                                  name="name"
                                  value={contactData.name}
                                  className="contact-name-details"
                                  required
                              />
                      </span>
                      <span>
                          <p className='contact-bsb'>BSB</p>
                              <input
                                  type="number"
                                  placeholder="BSB"
                                  onChange={handleChange}
                                  name="bsb"
                                  value={contactData.bsb}
                                  className="contact-bsb-details"
                                  min={100000}  // Ensures BSB is at least 5 digits
                                  max={999999}  // Ensures BSB is at most 5 digits
                                  pattern="\d{5}"
                                  title="Please enter exactly 6 digits"
                                  required
                              />
                      </span>
                      <span>
                        <p className='contact-account-number'>Account Number</p>
                          <input
                            type="number"
                            placeholder="Account Number"
                            onChange={handleChange}
                            name="accountNum"
                            value={contactData.accountNum}
                            className="contact-account-number-details"
                            min={10000000}  // Ensures account number is at least 8 digits
                            max={99999999}  // Ensures account number is at most 8 digits
                            pattern="\d{8}"
                            title="Please enter exactly 8 digits"
                            required
                          />
                      </span>
                      </>
                  )}
                  {contactData.contactType === "Phone" && (
                      <>
                      <span>
                          <p className='contact-name'>Name</p>
                              <input
                                  type="name"
                                  placeholder="Name"
                                  onChange={handleChange}
                                  name="name"
                                  value={contactData.name}
                                  className="contact-name-details"
                                  required
                              />
                      </span>
                      <span>
                        <p className='contact-phone'>Phone Number</p>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            name="phoneNum"
                            value={contactData.phoneNum}
                            className="contact-phone-details"
                            maxLength={10}
                            pattern="\d{10}"
                            title="Please enter exactly 10 digits"
                            required
                          />
                      </span>
                      </>
                  )}
                  {isExits && (
                    <>
                      <p>Contact already exists!</p>
                    </>
                  )}
                <button type='submit'>Save</button>
            </form>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
