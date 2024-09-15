import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './Components/Account.jsx';
import ForgotPassword from './Components/Forgot.jsx';
import Homepage from './Components/Homepage.jsx';
import Layout from './Components/Layout.jsx';
import ResetPassword from './Components/Reset.jsx';
import SavingAccount from './Components/SavingAccount.jsx';
import SignUp from './Components/SignUp.jsx';
import TransactionAccount from './Components/TransactionAccount.jsx';
import EditProfile from './Components/EditProfile.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage/>}/>
          <Route path = '/signup' element = {<SignUp/>}/>
          <Route path = '/home' element = {<Layout> <Account category = "home"/> </Layout>}/>
          <Route path = '/view' element = {<Layout> <Account category = "view"/> </Layout>}/>
          <Route path = '/contacts' element = {<Layout> <Account category = "contacts"/> </Layout>}/>
          <Route path = '/transfer' element = {<Layout> <Account category = "transfer"/> </Layout>}/>
          <Route path = '/settings' element = {<Layout> <Account category = "settings"/> </Layout>}/>
          <Route path = '/savingaccount' element = {<Layout> <SavingAccount/> </Layout>}/>
          <Route path = '/transactionaccount' element = {<Layout> <TransactionAccount/> </Layout>}/>
          <Route path = '/forgotpassword' element = {<ForgotPassword/>}/>
          <Route path = '/resetpassword' element = {<ResetPassword/>}/>
          <Route path = '/editprofile' element = {<Layout> <EditProfile/> </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
