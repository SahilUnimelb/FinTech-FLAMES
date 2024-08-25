import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './Components/Account';
import Layout from './Components/Layout.jsx';
import Login from './Components/Login.jsx';
import SignUp from './Components/SignUp.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/' element = {<Login/>}/>
        <Route path='/account' element = {<Layout> <Account/> </Layout>}/>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
