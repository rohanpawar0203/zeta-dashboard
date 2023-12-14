import React, {useRef} from 'react'
import {MdOutlineContentCopy} from 'react-icons/md'
import { toast } from 'react-toastify';
const EmbedBot = () => {
    const scriptRef = useRef(null);
    
    const copyContent = '<script defer="defer" src="https://www.ulai.in/file-server/web-sdk/web-sdk-init.js"></script> <div id="chatBot" data-value=654bb43769a5df1f26afe709></div>'
    
  const handleCopyScript = () => {
    const input = document.createElement('input');
    input.value = copyContent;
    document.body.appendChild(input);

    // Select the text and copy it
    input.select();
    document.execCommand('copy');

    // Remove the temporary input
    document.body.removeChild(input);

    toast.success('Text copied to clipboard');
  };

  return (
    <div className="d-flex flex-column align-items-left">
        <div className='mb-2'>
            <h3 className="mt-4 mb-1">Embed the bot</h3>
            <p className="mb-2">Paste the code snippet below in your HTML code where you want to display the Ulai chatbot.</p>
        </div>
        <div className="w-100 d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4">
        <button type="text" className="btn btn-outline-none fw-bolder border border-lightgray">Javascript</button>
        <button type="button" className="btn btn-outline-info fw-bolder">Manage allowed hosts</button>
        </div>
        <div style={{background: 'whitesmoke'}} className='w-100 d-flex justify-content-between align-items-center  py-5 px-4'>
         <div style={{width: '90%'}}>
         <p ref={scriptRef}>{copyContent}</p>
         </div>
         <div onClick={handleCopyScript} style={{background: 'skyblue', width: '50px', height: '50px', borderRadius: '50%'}} className='d-flex align-items-center justify-content-center'>
            <MdOutlineContentCopy style={{width: '20px', height: '20px'}} /> 
         </div>
        </div>
    </div>
  )
}

export default EmbedBot




