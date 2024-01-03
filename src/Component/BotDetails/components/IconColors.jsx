import React from 'react'

const IconColors = ({colorOptions, setMyBot, myBot}) => {
  return (
    <>
    {colorOptions.map((ele, i) => (
      <div onClick={() => setMyBot((pre) => ({...pre, accentColor: ele}))}
      className={`p-2 shadow-sm rounded mb-2 border border-lightgray d-flex justify-content-center align-items-center ms-4 
      ${ele === myBot?.accentColor ? 'border-primary shadow-md' : ''}`}
    >
    <div style={{ width: "30px", height: "30px", background: `${ele}`}}>
    </div>
    </div>
    ))}
    </>
  )
  
}

export default IconColors