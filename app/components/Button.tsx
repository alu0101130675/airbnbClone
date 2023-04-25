'use client'
import React from "react"
import { IconType } from "react-icons"

interface ButtonProps {
  label:string
  onClick:(e:React.MouseEvent<HTMLButtonElement>) =>void
  disable?: boolean
  outline?:boolean
  small?:boolean
  Icon?:IconType
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disable,
  Icon,
  outline,
  small}) => {
  return(
    <button
    onClick={onClick}
    className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    ${outline ? 'bg-white': 'bg-airbnb-color'}
    ${outline ? 'border-black': 'border-airbnb-color'}
    ${outline ? 'text-black': 'text-white'}
    ${small ? 'py-1': 'py-3'}
    ${small ? 'text-sm': 'text-md'}
    ${small ? 'font-light': 'font-semibold'}
    ${small ? 'border-[1px]': 'border-2'}
    `}>
      {Icon && 
        <Icon size={24}
        className="
        absolute
        left-4
        top-3"
        />}
      {label}
    </button>
  )
}