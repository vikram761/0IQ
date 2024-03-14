"use client"

import React, {useState} from 'react'
import Input from '@/component/input'
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Page = () => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [institute,setInstitute]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]= useState("TEACHER");  
  const router = useRouter();
    

  const registeruser = async(e:any)=>{
    e.preventDefault();
    const data = {
        name:name,
        email:email,
        password:password,
        institute:institute,
        role:role
    };

    axios.post('/api/register',data)
    .then(()=> router.push("/login"))
    .catch(()=> {console.log("Enter Valid Details")});
}


    

  return (
    <>

      <div className="fixed left-2 right-2 top-0 bg-white font-mono flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="  rounded border-solid   mt-1 mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-[black]">
              REGISTER ACCOUNT
            </h2>
          </div>  
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           <form className="space-y-6" onSubmit={registeruser} >
            <Input 
                id={'name'} 
                name={'name'} 
                type={'text'} 
                placeholder={'Name'} 
                value={name} 
                onChange={(e: any)=> setName(e.target.value)}
            />

            
            <Input 
                id={'email'} 
                name={'email'} 
                type={'email'} 
                placeholder={'Email Address'} 
                value={email} 
                onChange={(e:any)=> setEmail(e.target.value)}
            />

            <Input 
                id={'institute'} 
                name={'institute'} 
                type={'text'} 
                placeholder={'Institute Name'} 
                value={institute} 
                onChange={(e:any)=> setInstitute(e.target.value)}
            />
            <Input 
                id={'password'} 
                name={'password'} 
                type={'password'} 
                placeholder={'Password'} 
                value={password} 
                onChange={(e:any)=> setPassword(e.target.value)}
            />
           
           <div className='flex justify-center items-center'>
              <button 

                onClick={(e)=>{
                    e.preventDefault();
                    if(role=="TEACHER") setRole("STUDENT");
                    else setRole("TEACHER");
                }}
                className="flex w-1/2  justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  bg-[black] text-white hover:bg-black hover:text-white mt-5"
                >
                TOGGLE ROLE
              </button>
              <div
                className="flex w-1/2  justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm  bg-[white] text-black  mt-5"
                >
                {role}
              </div>
            
              
            </div>
            

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