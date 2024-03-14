
import React, { ChangeEventHandler } from 'react'

interface prop{
    id:string,
    name:string,
    type:string,
    placeholder:string,
    value: number | string,
    onChange:ChangeEventHandler<HTMLInputElement>
}

const input = ({id,name,type,placeholder,value,onChange}:prop) => {
  return (
    <div>
    <div className="mt-0">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="pl-8 text-black bg-white w-full rounded-md  py-1.5 text-gray-900  placeholder:text-gray-400 " />
    </div>
  </div>
  )
}

export default input