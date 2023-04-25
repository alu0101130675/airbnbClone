'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"
import { text } from "stream/consumers"

interface InputProps{
  id:string
  label:string
  type?:string
  disable?:boolean
  formatPrice:Boolean
  required?:boolean
  register:UseFormRegister<FieldValues>
  errors:FieldErrors
}
export const Input:React.FC<InputProps> = ({
  errors,
  formatPrice,
  id,
  label,
  register,
  disable,
  required,
  type = 'text'
}) =>{
  return(
    <div className="w-full relative">
      {formatPrice && 
      <BiDollar 
      size={24} 
      className="text-neutral-700 absolute top-5 left-2"/>}
      <input
      id={id} 
      type={type} 
      disabled={disable}
      {...register(id,{required})}
      placeholder=" "
      className={`
      peer
      w-full
      p-4
      pt-6
      font-light
      bg-white
      border-2
      rounded-md
      outline-none
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPrice ? 'pl-9' : 'pl-4'}
      ${errors[id] ? 'border-airbnb-color' : 'border-neutral-300'}
      ${errors[id] ? 'focus:border-airbnb-color' : 'focus:border-black'} `}
      />
      <label
      className={`
      absolute 
      top-5
      duration-150
      transform
      -translate-y-3
      origin-[0]
      z-10
      ${formatPrice ? 'left-9' : 'left-4'}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? 'text-airbnb-color' : 'text-zinc-400'}

      
      `}>
        {label}
      </label>
    </div>
  )
}