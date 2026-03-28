import React from 'react'
import { BsGlobeAmericas } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoClock } from "react-icons/go";

export default function BenefitsOfWebsites() {
  return (
    <div className='w-full bg-white'>
      <div className='mx-auto w-[1320px] border border-black py-[40px]'>
        <div className='flex justify-around'>
            <div className='flex-col px-[30px] py-5 group'>
                <div className='flex justify-center'>
                    <div className='border border-black rounded-[50%] h-[70px] w-[70px] flex justify-center items-center group-hover:border group-hover:border-yellow-700'>
                    <BsGlobeAmericas className='text-black text-[20px] group-hover:text-yellow-700'/>
                </div>
                </div>
                <h3 className='font-semibold text-[17px] mb-2 mt-4 text-black text-center'>Free Shipping</h3>
                <h4 className='text-[13.5px] tracking-[0.5] text-black text-center'>Free shipping on all order</h4>
            </div>
            <div className='flex-col px-[30px] py-5 group'>
                <div className='flex justify-center'>
                    <div className='border border-black rounded-[50%] h-[70px] w-[70px] flex justify-center items-center group-hover:border group-hover:border-yellow-700'>
                    <IoMdCheckmarkCircleOutline className='text-black text-[22px] group-hover:text-yellow-700'/>
                </div>
                </div>
                <h3 className='font-semibold text-[17px] mb-2 mt-4 text-black text-center'>Money Return</h3>
                <h4 className='text-[13.5px] tracking-[0.5] text-black text-center'>Back guarantee under 7 days</h4>
            </div>
            <div className='flex-col px-[30px] py-5 group'>
                <div className='flex justify-center'>
                    <div className='border border-black rounded-[50%] h-[70px] w-[70px] flex justify-center items-center group-hover:border group-hover:border-yellow-700'>
                    <GoClock className='text-black text-[22px] group-hover:text-yellow-700'/>
                </div>
                </div>
                <h3 className='font-semibold text-[17px] mb-2 mt-4 text-black text-center'>Online Support</h3>
                <h4 className='text-[13.5px] tracking-[0.5] text-black text-center'>Support online 24 hours a day</h4>
            </div>
        </div>
      </div>
    </div>
  )
}
