import React  from 'react'
import {MdDeleteSweep} from "react-icons/md"
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import AppContext from '../context/AppContext';
import { useContext } from 'react';

const CartItem = ({item}) => {

  const {decreaseQty,addToCart,removeItemfromcart}=useContext(AppContext);
   

  return (
    <div className="p-4 border-b-2 last:border-none border-slate-700">

    <div className="flex justify-between py-3.5 px-2.5 gap-14 flex-col md:flex-row">

      <div className="md:w-[30%] w-full flex justify-center items-center">
        <img src={item.imgsrc} alt="" className="w-[40%] md:w-[50%] lg:w-full"/>
      </div>
      <div className="md:w-[70%] w-full flex flex-col gap-5">
        <h1 className="text-xl font-[600] text-slate-700">{item.title}</h1>
        <h1 className="font-medium"> Qty:
          <span className='font-bold text-green-600'> {
          item.qty}
            </span> 
        </h1>
        <div className="flex justify-between">
          <p className="font-bold text-[#16a34a] text-lg">₹ {item.price}</p>

         <div className='flex gap-4'>
            <div  onClick={()=>decreaseQty(item.productId,1)} className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
            hover:bg-red-400 group transition-all">
              <FaCircleMinus  fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
            </div>
            <div onClick={()=>addToCart(item.productId,item.title,item.price,1,item.imgsrc)}
            className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
            hover:bg-red-400 group transition-all">
              <FaPlusCircle  fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
            </div>
            <div
             onClick={()=>{if(confirm("are you sure, want to remove from cart"))removeItemfromcart(item.productId)}}
            className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
            hover:bg-red-400 group transition-all">
              <MdDeleteSweep fontSize={25} className="group-hover:text-white text-red-800 transition-all"/>
            </div>
          </div> 
         
        </div>

      </div>


    </div>

  </div>
  )
}

export default CartItem