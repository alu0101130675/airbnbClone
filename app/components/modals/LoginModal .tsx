'use client'
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import { useRegisterModal } from "../hooks/useLoginRegisterModal"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import{signIn} from 'next-auth/react'
import { Modal } from "./Modal"
import { Heading } from "../Heading"
import { Input } from "/home/nelson/airbn-nextjs/airbnb-nextjs/app/components/inputs/Input"
import { toast } from "react-hot-toast"
import { Button } from "../Button"
import { useLoginModal } from "../hooks/useLoginModal "
import { useRouter } from "next/navigation"
export const LoginModal=()=>{
  const router = useRouter()
  const {onClose,isOpen} = useLoginModal()
  const [isLoading,setIsLoading] = useState(false)
  const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues:{email:'',password:''}})
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn("credentials",{
      ...data,
      redirect:false
    }).then(res =>{ 
      if (res?.ok) {
        toast.success('Logged in')
        onClose()
        router.refresh()
      } else {
        toast.error(res?.error || 'somwthing was wrong')
      }
  })}
  const bodyContent = (
    <div className='flex flex-col gap-4'>
    <Heading title="Welcome to Airbnb" subtitle="Login to your account" center/>
    <Input 
    id="email"
    label="Email"
    disable={isLoading}
    errors={errors}
    register={register}
    required
    type="text"
    />
    <Input 
    id="password"
    label="Password"
    disable={isLoading}
    errors={errors}
    register={register}
    required
    type="password"
    />
    </div>
    )
    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={()=>{}}
        />
        <Button
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={()=>{}}
        />
        <div className="text-neutral-500 text-center mt-4 font-light justify-center flex gap-4">
        <div className=" cursor-pointer hover:underline">
          Alredy have an account?
          </div>          
          <div className="hover:underline text-neutral-800" onClick={onClose}>
         Log in
          </div>
        </div>        
      </div>
    )
  
  return(
    <Modal 
    disable={isLoading}
    isOpen={isOpen}
    title="Login" 
    actionLabel="Continue"
    onClose={onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}