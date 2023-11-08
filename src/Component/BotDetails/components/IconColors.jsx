import React from 'react'

const IconColors = ({colorOptions}) => {
  return (
    <>
    {colorOptions.map((ele, i) => (
      <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;", boxSizing: 'border-box' }}
      className="p-2 rounded border border-lightgray d-flex justify-content-center align-items-center ms-3"
    >
    <div style={{ width: "30px", height: "30px", background: `${ele}`}}>
    </div>
    </div>
    ))}
    </>
  )
}

export default IconColors