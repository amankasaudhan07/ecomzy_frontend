import React, {useState,useContext} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email:"",
    password:""
   
})

const [showPassword, setShowPassword] = useState(false);


const changeHandler=(event)=> {

  setFormData( (prevData) =>(
      {
          ...prevData,
          [event.target.name]:event.target.value
      }
  ) )

}

const {  email, password } = formData;

const submitHandler = async (event)=> {
  event.preventDefault();

  const result = await login( email, password);
 
  if(result.success)
   { 
    navigate('/');
   }

}

  return (
    <div className='flex justify-around items-center py-12 mx-auto gap-x-12 gap-y-0 '>
      <div className='w-1/3 min-w-[420px] py-8 px-12 bg-slate-400 border-2 rounded-md border-slate-800'>
      <h1 className='flex justify-around items-center text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-12'>User Sign In</h1>
      <form onSubmit={submitHandler} className='w-full flex flex-col gap-y-4 mt-6 '>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email id"
                name="email"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span onClick={() => setShowPassword((prev) => !prev)} 
             className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
            </span>

        </label>

        <button className='w-full bg-yellow-50 rounded-[8px] font-medium mt-6 text-richblack-900 px-[12px] py-[8px]'>
            Sign In
        </button>

    </form>
      </div>
    </div>
  )
}

export default Login;