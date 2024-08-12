import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import ConfirmProduct from '../ConfirmProduct';

const OrderConfirmation = () => {

  const { userOrder, cart } = useContext(AppContext);

  // console.log(userOrder[0]);
  // console.log("ordercart",cart)

  return (
    <>
      <div className="flex flex-col justity-between items-center my-6 gap-2 w-full">
        <h1 className="font-bold text-4xl text-[#16a34a]  text-center">Your order has been confirmed,</h1>
        <h3 className="font-bold text-4xl text-[#16a34a] mb-8 text-center">It will be delivered soon</h3>

        <table className="bg-slate-400 border-2 border-black w-4/6">
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
            <tr className='border-b-2  border-black'>
              <td className="w-2/3">
                <ConfirmProduct cart={userOrder[0]?.orderItem} />
              </td>
              <td className="w-1/3 border-l-2   border-black">
                <ul className='ml-5 my-2'>
                  <li>Orderid : {userOrder[0]?.orderId}</li>
                  <li>Paymentid : {userOrder[0]?.paymentId}</li>
                  <li>PaymentStatus : {userOrder[0]?.payStatus}</li>
                  <li>Name : {userOrder[0]?.userShippiing?.fullName}</li>
                  <li>Phone : {userOrder[0]?.userShippiing?.phoneNumber}</li>
                  <li>Country : {userOrder[0]?.userShippiing?.country}</li>
                  <li>State : {userOrder[0]?.userShippiing?.state}</li>
                  <li>PinCode : {userOrder[0]?.userShippiing?.pincode}</li>
                  <li>Near By : {userOrder[0]?.userShippiing?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>


      </div>
    </>
  )
}

export default OrderConfirmation
