import React, { Fragment } from 'react'
import { Col, Input, InputGroup, InputGroupText, Row, } from 'reactstrap';
import {VscSend} from 'react-icons/vsc'
import ChatHeader from './ChatHeader';
import ScrollBar from 'react-perfect-scrollbar';
const BigBot = ({myBot}) => {
  return (
    <Fragment>
      <div style={{width:'350px', borderRadius: '12px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', zIndex: '3', background:'white'}} 
      className="d-flex flex-column" >
      <ChatHeader />
      <ScrollBar>
       <div style={{height: '250px', padding: '15px', border: '1px solid none'}} className='w-100'>
        <div  className="d-flex jusify-content-end align-items-center mb-1">
          <img src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75" alt="" 
           width='30px'
           height='30px'
           />
          <p style={{background: 'whitesmoke'}} className='mx-2 p-2 rounded'>Hi Welcome!</p>
        </div>
       </div>
       </ScrollBar>

      <div style={{borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px'}} className='border border-lightgray p-2'>
      <div style={{zIndex: '2', paddding:'5px', borderRadius: '25px', border: `1px solid ${myBot?.accentColor}`}} className='d-flex'>
            <Input style={{border: 'none', borderRadius: '25px'}} className="form-control" type="text" aria-label="Amount (to the nearest dollar)" placeholder='Send Message...'/>
            <InputGroupText className='d-flex justify-content-center align-items-center' 
            style={{width: '50px', height:'50px', borderRadius: '50%', background: `${myBot?.accentColor}`}}>
             <VscSend className='text-white fw-bolder'/>
            </InputGroupText>
       </div>
      </div>
      </div>    
    </Fragment>
  )
}

export default BigBot