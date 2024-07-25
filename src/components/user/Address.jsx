
import React, {useState,useContext} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Address = () => {
  const { shippingAddress ,userAddress} = useContext(AppContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName:"",
    address:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    phoneNumber:"",

})


const changeHandler=(event)=> {

  setFormData( (prevData) =>(
      {
          ...prevData,
          [event.target.name]:event.target.value
      }
  ) )

}

const { fullName,
  address,
  city,
  state,
  country,
  pincode,
  phoneNumber} = formData;

const submitHandler = async (event)=> {
  event.preventDefault();

  console.log(formData);
  
  const result = await shippingAddress(fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber);
 
  
    console.log(result);
    
    setFormData({
      fullName:"",
      address:"",
      city:"",
      state:"",
      country:"",
      pincode:"",
      phoneNumber:"",
      
    })

     if(result.success){
       navigate('/checkout');

     }

}

  return (
    <div className='flex justify-around items-center py-12 mx-auto gap-x-12 gap-y-0 '>
      <div className=' py-8 px-12 bg-slate-400 border-2 rounded-md border-slate-800'>
      <h1 className='flex justify-around items-center text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-12'>Shipping Address</h1>
        <form 
            onSubmit={submitHandler}>
         
            <div className='w-full flex flex-row gap-x-4 mt-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>FullName
                            <sup className='text-red-700'>*</sup>
                            </p>
                        <input
                            required
                            type="text"
                            name="fullName"
                            onChange={changeHandler}
                            placeholder="Enter FullName"
                            value={formData.fullName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Country
                        <sup className='text-red-700'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="country"
                            onChange={changeHandler}
                            placeholder="Enter Country name"
                            value={formData.country}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>State
                        <sup className='text-red-700'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="state"
                            onChange={changeHandler}
                            placeholder="Enter state name"
                            value={formData.state}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>


            <div className='w-full flex flex-row gap-x-4 mt-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>City
                            <sup className='text-red-700'>*</sup>
                            </p>
                        <input
                            required
                            type="text"
                            name="city"
                            onChange={changeHandler}
                            placeholder="Enter City "
                            value={formData.city}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Pincode
                        <sup className='text-red-700'>*</sup></p>
                        <input
                            required
                            type="number"
                            name="pincode"
                            onChange={changeHandler}
                            placeholder="Enter Pincode"
                            value={formData.pincode}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Phone Number
                        <sup className='text-red-700'>*</sup></p>
                        <input
                            required
                            type="number"
                            name="phoneNumber"
                            onChange={changeHandler}
                            placeholder="Enter Number"
                            value={formData.phoneNumber}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>
              {/* Address */}
            <div className='mt-4'>
              <label className='w-full'>
                      <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'> AddressLine/Nearby
                      <sup className='text-red-700'>*</sup></p>
                      <input
                          required
                          type="textarea"
                          name="address"
                          onChange={changeHandler}
                          placeholder="Enter Address "
                          value={formData.address}
                          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                      />
              </label>

            </div>
          
          <button className='w-full bg-yellow-50 rounded-[8px] font-medium mt-6 text-richblack-900 px-[12px] py-[8px]'>
              Submit
          </button>
        </form>

        {
           userAddress&&(

            <button  onClick={()=>navigate('/checkout')}
            className='w-full bg-yellow-50 rounded-[8px] font-medium mt-6 text-richblack-900 px-[12px] py-[8px]'>
                Use Old Address
            </button>
           )
        }

      </div>
    </div>
  )
}

export default Address