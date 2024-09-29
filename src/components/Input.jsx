import React from 'react'

const Input = ({id,label,type,name,value,onChange,error}) => {
  return (
    <label htmlFor={id} className="text-xl text-gray-900">
        {label}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter Title"
          className="w-full p-3 outline-none bg-gray-100 text-gray-900 text-[16px] md:text-xl border rounded-md"
        />
        {error && (
          <p className="text-red-400 text-sm ">{error}</p>
        )}
      </label>
  )
}

export default Input