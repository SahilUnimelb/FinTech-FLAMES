import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './Components/Account.jsx';
import Homepage from './Components/Homepage.jsx';
import Layout from './Components/Layout.jsx';
import Login from './Components/Login.jsx';
import SavingAccount from './Components/SavingAccount.jsx';
import SignUp from './Components/SignUp.jsx';
import TransactionAccount from './Components/TransactionAccount.jsx';
import ForgotPassword from './Components/Forgot.jsx';
import ResetPassword from './Components/Reset.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage/>}/>
          <Route path = '/signup' element = {<SignUp/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/home' element = {<Layout> <Account category = "home"/> </Layout>}/>
          <Route path = '/view' element = {<Layout> <Account category = "view"/> </Layout>}/>
          <Route path = '/business' element = {<Layout> <Account category = "business"/> </Layout>}/>
          <Route path = '/transfer' element = {<Layout> <Account category = "transfer"/> </Layout>}/>
          <Route path = '/settings' element = {<Layout> <Account category = "settings"/> </Layout>}/>
          <Route path = '/savingaccount' element = {<Layout> <SavingAccount/> </Layout>}/>
          <Route path = '/transactionaccount' element = {<Layout> <TransactionAccount/> </Layout>}/>
          <Route path = '/forgot-password' element = {<ForgotPassword/>}/>
          <Route path = '/reset-password' element = {<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
