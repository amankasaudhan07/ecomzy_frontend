import React, { useContext } from 'react';
import Showprod from './components/product/showprod';
import ProductDetail from './components/product/ProductDetail';
import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom';
import Navbar from './components/user/Navbar';
import SearchProduct from './components/product/SearchProduct';
import Register from './components/user/Register';
import  Login from './components/user/Login';
import Profile from './components/user/Profile';
import Cart from './components/user/Cart';
import Address from './components/user/Address';
import Checkout from './components/user/Checkout';
import OrderConfirmation from './components/user/OrderConfirmation';

const App = () => {
  // const {data}=useContext(AppContext)
  return (
    <>
     <Router>
       <div className="bg-slate-900">
       <Navbar/>

       </div>
       <Routes>
         <Route path='/' element={<Showprod/>}/>
         <Route path='/product/:id' element={<ProductDetail/>}/>
         <Route path='/product/search/:term' element={<SearchProduct/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/shipping' element={<Address/>}/>
         <Route path='/checkout' element={<Checkout/>}/>
         <Route path='/orderconfirmation' element={<OrderConfirmation/>}/>

         
       </Routes>
     </Router>
     
    </>
  )
}

export default App
