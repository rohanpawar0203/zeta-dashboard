import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const SmallBot = ({setcloseSmallBot}) => {
  return (
    <div style={{width:'300px', borderRadius: '10px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', zIndex: '3', background:'white'}} className='border  p-3'>
    <div className="w-100 d-flex align-items-center justify-content-between mb-3">
      <div className="d-flex align-items-center">
      <img width={'30px'} height={'30px'} style={{objectFit: 'cover'}} src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75" alt="" />
      <h6 className='m-0  ms-3'>Ulai</h6>
      </div>
      <div onClick={() => {setcloseSmallBot(true)}}>
       <RxCross2 style={{width: '20px', height: '20px'}} />
      </div>
    </div>
    <p className='m-0' style={{fontSize: '16px'}}>Hey there, how can I help you?</p>
   </div>
  )
}

export default SmallBot