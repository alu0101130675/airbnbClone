'use client'

import Image from "next/image"

export const Avatar = () => {
  return(
    <Image
    className="rounded-full"
    alt="Avatar"
    height='30'
    width='30'
    src='/images/placeholder.jpg'
    />
  )
}