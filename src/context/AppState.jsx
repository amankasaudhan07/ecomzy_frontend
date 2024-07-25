import React, { useState } from 'react'
import AppContext from './AppContext';
import axios from 'axios';
import { useEffect } from 'react';
import {toast} from "react-hot-toast"

const AppState = (props) => {
    // const url="http://localhost:4000/api";
     const url="https://ecomzy-backend-xifq.onrender.com/api";


    const [products,setProducts] =useState([]);
    const [token,setToken] =useState([]);
    const [filteredData,setFilteredData] =useState([]);
    const [isAuthenticated,setisAuthenticated] =useState(false);
    const [user,setUser] =useState();
    const [cart,setCart]=useState();
    const [reload,setReload]=useState(false);
    const [userAddress,setUserAddress]=useState();
    const [userOrder,setUserOrder]=useState([]);

    useEffect(()=>{
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`,{
                headers:{
                    "Content-Type":"Application/json",
                },
                withCredentials:true,
        });
    //    console.log(api);
       setProducts(api.data.products);
       setFilteredData(api.data.products);
        userProfile();
        userCart();
        getAddress();
        user_Order();
       
       };
       fetchProduct();
    },[token,reload]);

    // register user
    const register = async (name,email,password) => {
        const api = await axios.post(`${url}/user/register`,{name,email,password},{
            headers:{
                "Content-Type":"Application/json",
            },
            withCredentials:true,
    });
    
    console.log("user register",api);
    toast.success(api.data.message);
    return api.data;
   };

    // login user
    const login = async (email,password) => {
        const api = await axios.post(`${url}/user/login`,{email,password},{
            headers:{
                "Content-Type":"Application/json",
            },
            withCredentials:true,
    });
    
    // console.log("user login",api.data);
    toast.success(api.data.message);
    setToken(api.data.token);
    setisAuthenticated(true);
    localStorage.setItem('token',api.data.token)
    return api.data;
   };

   //logout
   const logout = async ()=>{
      setisAuthenticated(false)
      setToken(" ")
      localStorage.removeItem('token');
      toast.success("Logout Successfully....!");

   }

   useEffect(() => {
     setToken(localStorage.getItem('token'));
     setisAuthenticated(true)
   }, [])
   
//    userProfile
const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
//    console.log(api.data.user);
   setUser(api.data.user);


};

// add to cart
const addToCart = async (productId,title,price,qty,imgsrc) =>{
    const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgsrc},{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
setReload(!reload);
//    console.log("My cart",api);
   toast.success(api.data.message);
}

// get cart
const userCart = async () =>{
    const api = await axios.get(`${url}/cart/user`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
//    console.log("user cart",api.data.cart);
   setCart(api.data.cart);
  
}

// remove item from cart
const removeItemfromcart = async (productId) =>{
    const api = await axios.delete(`${url}/cart/removeProduct/${productId}`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
   
      setReload(!reload);
    //    console.log("remove item from cart",api);
      toast.success(api.data.message);
  
}

// decrease qty
const decreaseQty = async (productId, qty) =>{
    const api = await axios.post(`${url}/cart/--qty`,{productId, qty},{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
   
      setReload(!reload);
    //    console.log("My cart",api);
      toast.success(api.data.message);
  
}

// clear cart
const clearCart = async () =>{
    const api = await axios.delete(`${url}/cart/clear`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
   
    toast.success(api.data.message);
      setReload(!reload);
  
}

// add shipping address
const shippingAddress = async (fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber) =>{
    const api = await axios.post(`${url}/address/add`,{fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber},{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token
        },
        withCredentials:true,
});
   
    toast.success(api.data.message);
    // console.log(api);

    return api.data
  
}

// get latest address
const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token,
        },
        withCredentials:true,
});
//    console.log("user address is ",api.data.recentaddress);
  setUserAddress(api.data.recentaddress);

};

// get user order
const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userOrder`,{
        headers:{
            "Content-Type":"Application/json",
            "Auth":token,
        },
        withCredentials:true,
});

//   console.log("user order",api.data);
  setUserOrder(api.data);

};

 

  return (
  <AppContext.Provider value={{products,register,login,url,token,setisAuthenticated,isAuthenticated,
    filteredData,setFilteredData,logout,user,addToCart,cart,decreaseQty,removeItemfromcart,clearCart,
    shippingAddress,userAddress,userOrder
  }}>{props.children}</AppContext.Provider>
  );
};

export default AppState