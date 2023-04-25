'use client'
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import { useRegisterModal } from "../hooks/useLoginRegisterModal"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { Modal } from "./Modal"
import { Heading } from "../Heading"
import { Input } from "/home/nelson/airbn-nextjs/airbnb-nextjs/app/components/inputs/Input"
import { toast } from "react-hot-toast"
import { Button } from "../Button"
export const RegisterModal=()=>{
  const {onClose,isOpen} = useRegisterModal()
  const [isLoading,setIsLoading] = useState(false)
  const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({defaultValues:{name:'',email:'',password:''}})
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/register',data)
    .then(()=>onClose())
    .catch(e=>toast.error('something went wrong'))
    .finally(()=> setIsLoading(false))
  }
  const bodyContent = (
    <div className='flex flex-col gap-4'>
    <Heading title="Welcome to Airbnb" subtitle="Create an account" center/>
    <Input 
    id="email"
    label="Email"
    disable={isLoading}
    errors={errors}
    register={register}
    required
    type="email"
    />
    <Input 
    id="name"
    label="Name"
    disable={isLoading}
    errors={errors}
    register={register}
    required
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
    title="Register" 
    actionLabel="Continue"
    onClose={onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}