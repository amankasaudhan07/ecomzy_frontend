import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa"
import { FaSearch } from "react-icons/fa";
import AppContext from '../../context/AppContext';
import { useContext } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated ,cart} = useContext(AppContext);
 
  //  console.log("isAuthenticated",isAuthenticated);
  //  console.log("cart is",cart);
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };
  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault(); 
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("")
  }

  return (
    <div >
      <nav className=" flex justify-between items-center h-20 max-w-6xl mx-auto">

        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" className="lg:h-14 md:h-10 h-8" alt="" />
          </div>
        </NavLink>
        <form className="relative w-96 min-w-44" onSubmit={submitHandler}>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none  focus:border-blue-900" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FaSearch className='hover:cursor-pointer' onClick={submitHandler}/>
          </div>
        </form>
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">


        {
            !isAuthenticated && (
              <>
                <NavLink to="/login">
                  <p>Login</p>
                </NavLink>
                <NavLink to="/register">
                  <p>Register</p>
                </NavLink>
              </>
            )
          }
          {isAuthenticated && (
            <>
              <NavLink to="/">
                <p>Home</p>
              </NavLink>
              <NavLink to="/profile">
                <p>Profile</p>
              </NavLink>
              <NavLink to="/cart">
                <div className="relative">
                  <FaShoppingCart className="text-2xl" />
                  
                   { cart?.items.length>0&&(

                     <span
                     className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                     justify-center items-center animate-bounce rounded-full text-white"
                     >{cart?.items.length}</span>
                     )
  
                     }
                  

                </div>
              </NavLink>
              <NavLink onClick={() => {
                logout();
                navigate('/')
              }
              } >
                <p>Logout</p>
              </NavLink>
            </>
          )}

        </div>
      </nav>
      {
        location.pathname === '/' && (

          <div className='bg-slate-800 flex justify-between items-center h-12 px-4 font-medium text-slate-100 mx-auto'>
            <NavLink onClick={() => setFilteredData(products)} className='px-4  py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>No Filter</p>
            </NavLink>
            <NavLink onClick={() => filterByCategory("clothes")} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg ' >
              <p>Clothes</p>
            </NavLink>
            <NavLink onClick={() => filterByCategory("laptops")} className='px-4 py-1  hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>Laptops</p>
            </NavLink>
            <NavLink onClick={() => filterByCategory("mobiles")} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>Mobiles</p>
            </NavLink>
            <NavLink onClick={() => filterByCategory("gadgets")} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg'>
              <p>Gadgets</p>
            </NavLink>
            <NavLink onClick={() => filterbyPrice(49999)} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>49999</p>
            </NavLink>
            <NavLink onClick={() => filterbyPrice(29999)} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>29999</p>
            </NavLink>
            <NavLink onClick={() => filterbyPrice(9999)} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>9999</p>
            </NavLink>
            <NavLink onClick={() => filterbyPrice(999)} className='px-4 py-1 hover:bg-slate-900 border-slate-900 rounded-lg '>
              <p>999</p>
            </NavLink>

          </div>
        )}
    </div>
  )
}

export default Navbar