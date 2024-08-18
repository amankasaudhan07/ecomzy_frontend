import React,{useContext} from 'react'
import AppContext from '../../context/AppContext';
import ConfirmProduct from '../ConfirmProduct';

const Profile = () => {
    const {user,userOrder}=useContext(AppContext);
    // console.log("user order is",userOrder);
  return (
    <div className='flex flex-col justify-center items-center mt-6 text-gray-900'>
        <h1 className='font-bold text-4xl text-[#1d783e]'>Welcome, {user?.firstName+" "+user?.lastName}</h1>
        <h3  className='mt-2 text-2xl mb-1 text-[#1d783e]'>[{user?.email}]</h3>
       {
         userOrder.length >0 ?(
           <>
            <h1 className='text-5xl '>Total Order : {userOrder?.length} </h1>

            <table className="bg-slate-400 border-2 my-4 border-black w-4/6">
              <thead className="border-b-2 border-black ">
                <tr>
                  <th scope="col" className="w-2/3 text-center">
                    Order Items
                  </th>

                  <th scope="col" className="w-1/3 border-l-2  border-black text-center">
                    OrderDetails && ShippingAddress
                  </th>
                </tr>
              </thead>
              <tbody className="">
              {
                userOrder?.map((order)=>
              
                <tr className='border-b-2  border-black'>
                  <td className="w-2/3">
                    <ConfirmProduct cart={order?.orderItem} />
                  </td>
                  <td className="w-1/3 border-l-2   border-black">
                    <ul className='ml-5 my-2'>
                      <li>Orderid : {order?.orderId}</li>
                      <li>Paymentid : {order?.paymentId}</li>
                      <li>PaymentStatus : {order?.payStatus}</li>
                      <li>Name : {order?.userShippiing?.fullName}</li>
                      <li>Phone : {order?.userShippiing?.phoneNumber}</li>
                      <li>Country : {order?.userShippiing?.country}</li>
                      <li>State : {order?.userShippiing?.state}</li>
                      <li>PinCode : {order?.userShippiing?.pincode}</li>
                      <li>Near By : {order?.userShippiing?.address}</li>
                    </ul>
                  </td>
                </tr>
                )}
              </tbody>
            </table>

           </>
         ):(
          <div className="w-screen h-[calc(100vh-80px)] flex justify-center items-center">
          <p className="text-3xl font-bold">No order found !</p>
            </div> 
         )
       } 
    </div>
  )
}

export default Profile