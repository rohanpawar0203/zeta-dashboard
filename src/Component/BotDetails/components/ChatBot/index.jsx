import SmallBot from './components/SmallBot';
import BigBot from './components/BigBot';
import {BsChevronDown} from 'react-icons/bs'
import {BsRobot} from 'react-icons/bs'
import { useState } from 'react';

const ChatBot = () => {
    const [bot, setbot] = useState('smallBot') 
    const [closeSmallBot, setcloseSmallBot] = useState(false);

    return (
        <div style={{position: 'absolute', bottom: '40px', right: '40px'}}>
       
       {bot === 'smallBot' ?  <>
       <div className="d-flex flex-column justify-content-end align-items-end">
        <div className="mb-2">
            {!closeSmallBot && <SmallBot setcloseSmallBot={setcloseSmallBot}/>}
        </div>
       <div onClick={() => {setbot('bigBot')}} style={{width: '50px', height: '50px', borderRadius: '50%', background: 'purple'}} className='d-flex align-items-center justify-content-center'>
       <BsRobot  style={{width: '30px', height: '30px', color: 'white', fontWeight: '600'}}/>
       </div>
       </div>
       </> 
       :  <>
       <div className="d-flex flex-column justify-content-end align-items-end">
        <div className="mb-2">
        <BigBot />
        </div>
        <div onClick={() => {setbot('smallBot')}} style={{width: '50px', height: '50px', borderRadius: '50%', background: 'purple'}} className='d-flex align-items-center justify-content-center'> 
        <BsChevronDown  style={{width: '30px', height: '30px', color: 'white', fontWeight: '600'}}/>
        </div> 
       </div>
       </> 
       }
       </div>
    )
}

export default ChatBot;