import React from 'react'
import AppContext from '../../context/AppContext'
import { useContext,useEffect,useState } from 'react'
import TableProduct from '../TableProduct'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'


const Checkout = () => {

  const {userAddress,cart,url,user,clearCart} =useContext(AppContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [qty,setQty] = useState(0);
  console.log("address",userAddress);

  const navigate =useNavigate();

  useEffect(() => {
    let qty=0;
    let price=0;
    if(cart?.items)
    {
     for(let i=0;i<cart?.items.length;i++)
     {
       qty+=cart?.items[i].qty;
       price+=cart?.items[i].price;

     }
     setQty(qty);
     setTotalAmount(price);
    }
  }, [cart])


  const handlePayment = async () =>{
    try{
     const orderResponse = await axios.post(`${url}/payment/checkout`,{
       amount:totalAmount,
       qty:qty,
       cartitems:cart?.items,
       userShippiing:userAddress,
       userId:user._id,
      });

      // console.log("order Response",orderResponse)
       
      const {orderId,amount:orderAmount}=orderResponse.data
      
      var options = {
        "key": "rzp_test_SLzCnuZqwFDnzc", // Enter the Key ID generated from the Dashboard
        "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Ecomzy",
        "description": "Ecomzy",
       
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler":async function (response){
          const paymentData={
             orderId:response.razorpay_order_id,
             paymentId:response.razorpay_payment_id,
             signature:response.razorpay_signature,
             amount:orderAmount,
             orderItem:cart?.items,
             userId:user._id,
             userShippiing:userAddress,
          }

          const api=await axios.post(`${url}/payment/verify-payment`,paymentData);
          
          // console.log("razorpay res",api.data);
          if(api.data.success){
            clearCart();
          navigate('/orderconfirmation');
          }
        },
        "prefill": {
            "name": "Ecomzy",
            "email": "ecomzy@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Ecomzy Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
    
      <div className="flex flex-col justity-between items-center my-6 gap-4 w-full">
        <h1 className="font-bold text-4xl text-[#16a34a] mb-4 text-center">Order Summary</h1>

        <table className="bg-slate-400 border-2 border-black w-4/6">
          <thead className="border-b-2 border-black ">
            <tr>
              <th scope="col" className="w-2/3 text-center">
                Product Details
              </th>

              <th scope="col" className="w-1/3 border-l-2  border-black text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className='border-b-2  border-black'>
              <td className="w-2/3">
                <TableProduct cart={cart} />
              </td>
              <td className="w-1/3 border-l-2   border-black">
                <ul className='ml-5 my-2'>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>PinCode : {userAddress?.pincode}</li>
                  <li>Near By : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

      
        <button onClick={handlePayment}
        className="bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md
        border-[#16a34a] border-2 hover:bg-white hover:text-[#16a34a] ease-in transition-all duration-300">
          Proceed to pay 
        </button>
     

      </div>
    </>
  )
}

export default Checkout
