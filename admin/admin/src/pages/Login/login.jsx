import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { loginContext } from '../Context/MainContext'
import { Link, useNavigate } from 'react-router'

export default function Login() {

    let {adminId, setAdminId} = useContext(loginContext)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let navigate = useNavigate()

  let saveLogin = (event)=>{
    event.preventDefault()
    let obj = {
        adminEmail: event.target.email.value,
        adminPassword: event.target.password.value
    }
    axios.post(`${apiBaseUrl}adminAuth/login`,obj).then((res)=>res.data).then((finalRes)=>{
        if(finalRes.status){
            setAdminId(finalRes.adminID)
        }
        else{
            alert(finalRes.msg)
        }
        event.target.reset
    })
  }

  useEffect(()=>{
    if(adminId!="" && adminId!=null){
        navigate("/dashboard")
    }
  },[adminId])

  return (
    <div className='border w-full h-screen bg-gray-200 relative'>
      <form onSubmit={saveLogin}>
        <div className='h-[330px] w-[400px] shadow-[0px_0px_10px_2px_gray] absolute top-[25%] left-[35%] pt-[10px] ps-[10px]'>
        <h2 className='text-black font-bold text-[22px] mb-[20px] text-center'>Sign in to your account</h2>
        <h3 className='mb-[7px] font-semibold'>Email</h3>
        <input type="text" 
        name='email'
        placeholder='Enter Email' className='w-[95%] h-[30px] border ps-[10px] text-[13px] mb-[10px] rounded-[5px]'/>
        <h3 className='mb-[7px] font-semibold'>Password</h3>
        <input type="password" 
        name='password'
        placeholder='Enter Password' className='w-[95%] h-[30px] border ps-[10px] text-[13px] mb-[10px] rounded-[5px]'/>
        <div className='flex justify-end mb-4 me-[20px]'>
          <Link to={'/forgot-password'} className='text-[13px] text-indigo-600 hover:text-indigo-800 hover:cursor-pointer'>Forgot Password</Link>
        </div>
        <button className='bg-indigo-800 cursor-pointer text-white w-[95%] h-[35px] border ps-[10px] text-[15px] mb-[10px] mt-[10px] rounded-[7px] font-semibold'>Sign In</button>
      </div>
      </form>
    </div>
  )
}
