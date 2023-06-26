import logo from './logo.svg';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import {Button} from 'react-bootstrap';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Details from './Details';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/posts/:title' element={<Details/>} />
          <Route path='/*' element={<h2>Page Not Found</h2>} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
