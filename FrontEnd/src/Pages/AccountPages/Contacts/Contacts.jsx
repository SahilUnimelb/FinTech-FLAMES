import React, { useEffect, useState } from 'react';
import addSign from '../../../Assets/add-sign.svg';
import closeSign from '../../../Assets/close-button.svg';
import crossSign from '../../../Assets/cross-icon.svg';
import './Contacts.css';
export default function Contacts({accounts, phones, addContactDetails, selectedAccount, onClickRemoveAccount, onClickRemoveClose, removeAccount, removeMessage}) {

  const [searchAccount, setSearchAccount] = useState('');

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchAccount.toLowerCase())
  );

  const [searchPhone, setSearchPhone] = useState('');

  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchPhone.toLowerCase())
  );


  const [isAdd, setIsAdd] = useState(false);
  const [isExist, setIsExist] = useState(false);

  const [active, setActive] = useState('bank');
  function onClickDiv(type) {
    setActive(type);
  }

  const [contactData, setContactData] = useState({
    contactType:"",
    name:"",
    bsb:"",
    accountNumber:"",
    phoneNumber:""
  });
  useEffect(() => {
    setIsExist(false)
    setContactData({
      contactType: contactData.contactType,
      name: "",
      bsb: "",
      accountNumber: "",
      phoneNumber: ""
    })
  }, [contactData.contactType])
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

  function handleSubmit(event) {
    event.preventDefault();
    const accountExists = accounts.some(account =>
    (account.accountNumber === contactData.accountNumber));
    const phoneExists = phones.some(phone =>
      phone.phoneNumber === contactData.phoneNumber
    );
    if (accountExists || phoneExists) {
      setIsExist(true)
      return;
    }
    setIsExist(false);
    addContactDetails(contactData);
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
      accountNumber: "",
      phoneNumber: ""
    })
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
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchAccount}
                onChange={(e) => setSearchAccount(e.target.value)}
                className="search-input"
              />
            </div>
            <div className='contact-list-body'>
            {filteredAccounts.length> 0 && (
              <>
              {filteredAccounts.map((account) =>{
                return <div key = {account.id} className='contact-list-individual'>
                  <div className='contact-information'>
                    <h3> {account.name} </h3>
                    <p> BSB: {account.bsb} </p>
                    <p> Account Number: {account.accountNumber}</p>
                  </div>
                  <div className='contact-remove-sign'>
                    <img src= {crossSign} alt='' onClick={() => onClickRemoveAccount(account)} />
                  </div>
                </div>
              })}
              </>
            )}
            {filteredAccounts.length === 0 && (
              <>
              No Contacts!
              </>
            )}
            </div>
            </>
          )}
          {active === "phone" && (
            <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="search-input"
              />
            </div>
            <div className='contact-list-body'>
            {filteredPhones.length> 0 && (
              <>
              {filteredPhones.map((phone) => {
                  return <div key = {phone.id} className='contact-list-individual'>
                    <div className='contact-information'>
                    <h3> {phone.name} </h3>
                    <p> Phone Number: {phone.phoneNumber} </p>
                    </div>
                    <div className='contact-remove-sign'>
                    <img src= {crossSign} alt='' onClick={() => onClickRemoveAccount(phone)} />
                    </div>
                  </div>
              })}
              </>
            )}
            {filteredPhones.length === 0 && (
              <>
              No Contacts!
              </>
            )}
            </div>
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
                    <label htmlFor='contact-type' className='contact-form-label'>Transfer Options</label>
                    <select
                        id='contact-type'
                        name='contactType'
                        value={contactData.contactType}
                        onChange={handleChange}
                        className='contact-form-fill-up'
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
                          <p className='contact-form-label'>Name</p>
                              <input
                                  type="name"
                                  placeholder="Name"
                                  onChange={handleChange}
                                  name="name"
                                  value={contactData.name}
                                  className="contact-form-fill-up"
                                  required
                              />
                      </span>
                      <span>
                          <p className='contact-form-label'>BSB</p>
                              <input
                                  type="text"
                                  placeholder="BSB"
                                  onChange={handleChange}
                                  name="bsb"
                                  value={contactData.bsb}
                                  className="contact-form-fill-up"
                                  maxLength="6"
                                  pattern="\d{6}"
                                  title="Please enter exactly 6 digits"
                                  required
                              />
                      </span>
                      <span>
                        <p className='contact-form-label'>Account Number</p>
                          <input
                            type="text"
                            placeholder="Account Number"
                            onChange={handleChange}
                            name="accountNumber"
                            value={contactData.accountNumber}
                            className="contact-form-fill-up"
                            maxLength="8"
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
                          <p className='contact-form-label'>Name</p>
                              <input
                                  type="name"
                                  placeholder="Name"
                                  onChange={handleChange}
                                  name="name"
                                  value={contactData.name}
                                  className="contact-form-fill-up"
                                  required
                              />
                      </span>
                      <span>
                        <p className='contact-form-label'>Phone Number</p>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            name="phoneNumber"
                            value={contactData.phoneNumber}
                            className="contact-form-fill-up"
                            maxLength={10}
                            pattern="\d{10}"
                            title="Please enter exactly 10 digits"
                            required
                          />
                      </span>
                      </>
                  )}
                  {isExist && (
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