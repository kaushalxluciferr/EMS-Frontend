import React from 'react'

function SummaryCard({icon,text,number,color}) {
  return (
    <div className='rounded flex bg-white'>
      <div className={` ${color} text-3xl flex justify-center items-center  text-white px-4`}>
     {icon}
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font-bold'><p></p>{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
