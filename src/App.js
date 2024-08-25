import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './Components/Account';
import Layout from './Components/Layout.jsx';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Login/>}/>
        <Route path='/account' element = {<Layout> <Account/> </Layout>}/>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
