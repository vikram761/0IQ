
"use client"

import React, {useState} from 'react'
import Input from '@/component/input'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Page = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const router = useRouter();
    
  const loginuser = async(e:any)=>{
    e.preventDefault();

    const data= {
        email,
        password
    }
   
    signIn('credentials',{...data,redirect:false})
    .then((response)=>{
        if(! response?.ok){
            throw new Error(response?.error as string);
        }
        router.push("/");
    })
    .catch((err)=> console.log(err))


}

  return (
    <>

      <div className="fixed left-2 right-2 top-0 bg-white font-mono flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="  rounded border-solid   mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-[black]">
              LOGIN
            </h2>
          </div>  
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           <form className="space-y-6" onSubmit={loginuser} >
            
            <Input 
                id={'email'} 
                name={'email'} 
                type={'email'} 
                placeholder={'Email Address'} 
                value={email} 
                onChange={(e:any)=> setEmail(e.target.value)}
            />

            <Input 
                id={'password'} 
                name={'password'} 
                type={'password'} 
                placeholder={'Password'} 
                value={password} 
                onChange={(e:any)=> setPassword(e.target.value)}
            />
           
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm border-2 border-black border-solid bg-[black] text-white hover:bg-black hover:text-white mt-5"
                >
                SEND
              </button>
            </div>
           </form> 
        </div>
      </div>
    </> 
  )
}


export default Page