import React from 'react'

export default function Collection() {
  return (
    <div className='w-full relative'>
      <img src="https://images.prop24.com/299546557" className='h-[500px] w-full'/>
      <div className='absolute top-[120px] left-[200px] text-black hover:scale-[1.1] cursor-pointer'>
        <h2 className='text-5xl font-bold mb-3'>New Trending Collection</h2>
        <p className='text-[16px] text-gray-600 mb-20'>We Believe That Good Design is Always in Season</p>
        <button className='border-2 border-yellow-800 py-3 px-9 text-yellow-700 font-semibold rounded-[5px] hover:bg-yellow-700 hover:text-white cursor-pointer'>Shopping Now</button>
      </div>
    </div>
    
  )
}