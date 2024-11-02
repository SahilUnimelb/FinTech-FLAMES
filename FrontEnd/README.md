# FrontEnd Logic Layer

This layer contains the core logic of the frontend of the application

- **Technologies Used**: React.js, react-router-dom

##### Key Components:

- **`Navbar.jsx`**
  - **Description**: Renders the navbars for the app
  - **Responsibilities**: Contains links for different pages, such as home, view accounts, transfer and settings. Also contains a logoff button
  - 
- **`Chatbot.jsx`**
  - **Description**: Renders the chatbot of the app
  - **Responsibilities**: Users can interact with the chatbot and seek immediate assistance

##### Key Pages:

- **`Account.jsx`**
  - **Description**: Manages account pages
  - **Responsibilities**: Contains the components of all the main pages in the account and helps to pass data between those pages
    
- **`Admin.jsx`**
  - **Description**: Renders the admin panel of the app
  - **Responsibilities**: Admin can perform all the administrative activities from this page
    
- **`Contacts.jsx`**
  - **Description**: Renders all the saved contacts
  - **Responsibilities**: Users can add/delete contacts of other users from this page
    
- **`EditProfile.jsx`**
  - **Description**: Renders the edit profile page of the app
  - **Responsibilities**: User can edit the details of their account from this page

- **`Home.jsx`**
  - **Description**: Renders the home page of the account
  - **Responsibilities**: User can see the bank balance of their accounts and as well as check the transaction history

- **`Settings.jsx`**
  - **Description**: Renders the settings page of the account
  - **Responsibilities**: User can perform actions from the settings page, such as turn on instructons mode etc.

- **`Transfer.jsx`**
  - **Description**: Renders the transaction page of the account
  - **Responsibilities**: Users can send funds to other users, or between their own accounts or even schedule payment for future date
    
- **`ViewAccounts.jsx`**
  - **Description**: Renders the view account page of the account
  - **Responsibilities**: User can check all their details related to their account, including their username, credit card and previous transactions

- **`Homepage.jsx`**
  - **Description**: Renders the front page of the app
  - **Responsibilities**: User can see the front page of the app and as well as login or go to the sign up or forget password page

- **`Signup.jsx`**
  - **Description**: Renders the signup page of tha account
  - **Responsibilities**: User can create new account from this page
