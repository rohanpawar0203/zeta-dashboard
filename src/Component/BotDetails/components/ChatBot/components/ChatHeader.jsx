import React, { Fragment, useContext } from 'react';
import { Media } from 'reactstrap';

const ChatHeader = () => {
  
  
  return (
    <Fragment>
      <div style={{background: 'orange', width:'300px', borderRadius: '10px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}} className="d-flex flex-column align-items-center  text-white p-2">
        <p className='m-0 my-2'>Ulai</p>
        <img      src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75"
                    width={"42px"}
                    alt={'ulai bot'}
                    height={"42px"}
                    style={{
                        padding: "4px",
                        border: "1px solid #cbc6c2",
                        borderRadius: "4px",
                    }}
                  />
        <p className='m-0 my-2'>Our bot answers instantly</p>
        </div>
    </Fragment>
  );
};
export default ChatHeader;
