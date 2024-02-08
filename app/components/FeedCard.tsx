import React from 'react'
import Image from 'next/image'

const FeedCard: React.FC =()=> {
  return (
    <div className='border'>
      <div className='grid grid-cols-12 '>
       <div className='col-span-4'>
        <Image 
        src="/myImage1.png"
        alt="user"
        width={50}
        height={50}
        />
       </div>
      </div>
    </div>
  )
}

export default FeedCard
