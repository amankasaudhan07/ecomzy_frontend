import React, {useState,useContext} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
})

const [showPassword1, setShowPassword1] = useState(false);
const [showPassword2, setShowPassword2] = useState(false);

const changeHandler=(event)=> {

  setFormData( (prevData) =>(
      {
          ...prevData,
          [event.target.name]:event.target.value
      }
  ) )

}

const { firstName,lastName, email, password } = formData;

const submitHandler = async (event)=> {
  
  event.preventDefault();
  console.log("formdata",formData);
  if(formData.password != formData.confirmPassword) {
      toast.error("Passwords do not match");
      return ;
  }
  
  const result = await register(firstName,lastName, email, password);
 
  if(result.success)
   { 
    navigate('/login');
   }

}

  return (
    <div className='flex justify-around items-center py-12 mx-auto gap-x-12 gap-y-0 '>
      <div className=' py-8 px-12 bg-slate-400 border-2 rounded-md border-slate-800'>
      <h1 className='flex justify-around items-center text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-12'>User Signup</h1>
        <form 
            onSubmit={submitHandler}>
          {/* first name and lastName */}
            <div className='w-full flex flex-row gap-x-4 mt-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name
                            <sup className='text-red-700'>*</sup>
                            </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name
                        <sup className='text-red-700'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>
              {/* email Add */}
            <div className='mt-4'>
              <label className='w-full'>
                      <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address
                      <sup className='text-red-700'>*</sup></p>
                      <input
                          required
                          type="email"
                          name="email"
                          onChange={changeHandler}
                          placeholder="Enter Email Address "
                          value={formData.email}
                          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                      />
              </label>

            </div>
            {/* createPassword and Confirm Password */}
            <div className='w-full flex flex-row gap-x-4 mt-4'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password
                    <sup className='text-red-700'>*</sup></p>
                    <input
                        required
                        type= {showPassword1 ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span onClick={() => setShowPassword1((prev) => !prev)}
                    className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword1 ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password
                    <sup className='text-red-700'>*</sup></p>
                    <input
                        required
                        type= {showPassword2 ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span onClick={() => setShowPassword2((prev) => !prev)}
                    className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword2 ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
          <button className='w-full bg-yellow-50 rounded-[8px] font-medium mt-6 text-richblack-900 px-[12px] py-[8px]'>
              Create Account
          </button>
        </form>

      </div>
    </div>
  )
}

export default Register