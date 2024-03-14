
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function  POST(request: any) {
    
    
    const body = await request.json();

    const {name,email,password,institute,role}=body;
    
    const userExists = await prisma.user.findUnique({
        where:{
            email
        }
    });

    if(userExists){
        throw new Error('Email Already Exists');
    }

    const hasedpassword = await bcrypt.hash(password,10);

    
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hasedpassword,
            institute,
            role
        }
    });

    console.log("USER CREATED ",user);
    return NextResponse.json(user,{status:200});

}