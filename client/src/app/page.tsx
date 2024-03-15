/* eslint-disable react-hooks/rules-of-hooks */
"use client"


import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

const page = () => {

    const [session,setSession]=useState("");

  useEffect(()=>{
    const fetchSession = async () => {
      const data = await getSession();
        if(data)  setSession(data as unknown as string);
    }

    fetchSession();
  },[])  

  
  return (

     <div>
        <div>USER : {JSON.stringify(session)} </div>
        <button className="bg-[black] text-white rounded p-1"
        onClick={(e)=>{
          signOut();
        }}>
          LogOut
        </button>
    </div>
  )
}

export default page