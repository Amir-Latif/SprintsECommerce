import './App.css';
import Home from './screens/Home';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import data from './utils/Data';
import SignInPage from './screens/SignInPage';
import SignUp from './screens/SignUp';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(data);
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home state={state} />} />
        <Route path='/home' element={<Home state={state} />} />
        <Route path='/product/:id' element={<ProductDetails state={state} />} />
        <Route path='/products' element={<Products state={state} />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
