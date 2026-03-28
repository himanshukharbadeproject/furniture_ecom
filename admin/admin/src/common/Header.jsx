import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { loginContext } from '../pages/Context/MainContext';
import { useNavigate } from 'react-router';


export default function Header() {

  let [toggleData, setToggleData] = useState(false)

  let {adminId, setAdminId} = useContext(loginContext)
  let navigate = useNavigate()
  let toggleMenu = ()=>{
    setToggleData(!toggleData)
  }

  useEffect(()=>{
    if(adminId==""){
      navigate("/")
    }
  },[adminId])

  return (
    <header className="py-[10px] border-b-[3px] border-gray-300">
        <div className="flex justify-between items-center">
          <div className="flex gap-[20px] px-[20px]">
            <AiOutlineMenu className="text-[26px] text-gray-500 mt-[5px]" />
            <p className="text-[22px] text-gray-500 font-semibold">Dashboard</p>
          </div>
          <div className='relative'>
            <button onClick={toggleMenu}>
              <img
            src="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTJkODg3YTMwLTRlNmYtMTFlZi04MGUwLTg5MTBmNjk1YjZkZS5qcGc="
            alt=""
            className="w-[45px] h-[45px] rounded-[50%] mr-[50px] cursor-pointer"
            />
            </button>
            <div className={`absolute h-[150px] w-[140px] bg-white shadow-[0px_0px_10px_2px_gray] top-[110%] right-[30%] ${toggleData?'block':'hidden'}`}>
              <ul className='mt-[20px] px-[10px]'>
                <li className='text-[17px] font-semibold py-1'><button 
                 onClick={()=>{
                      navigate("/profile")
                    }}
                className='hover:border w-full'>Profile</button></li>
                <li className='text-[17px] font-semibold py-1'><button className='hover:border w-full'>Company</button></li>
                <li className='text-[17px] font-semibold py-1'><button 
                onClick={()=>setAdminId('')}
                className='hover:border w-full'>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
  )
}
