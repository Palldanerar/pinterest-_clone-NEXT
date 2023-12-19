"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaSearch, FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { signIn, useSession } from 'next-auth/react';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "@/app/firebase"
import { useRouter } from 'next/navigation';

const Header = () => {

    const { data: session } = useSession()
    const router = useRouter();
    const db = getFirestore(app);

    useEffect(() => {
        saveUserInfo();
    }, [session])

    console.log(session)

    const saveUserInfo = async () => {
        if (session?.user) {
            // @ts-ignore
            await setDoc(doc(db, "user", session.user.email), {
                userName: session.user.name,
                email: session.user.email,
                userImage: session.user.image
            });
        }
    }

    const onCreateClick = () => {
        if (session) {
            router.push('/pin-builder')
        }
        else {
            signIn()
        }
    }

    return (
        <div className='flex justify-between gap-3 md:gap-2 items-center p-6'>
            <Image src="/pinterst-logo.png" alt='Logo' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
            <button onClick={() => router.push('/')} className='bg-black text-white p-3 px-6 rounded-full text-[25px] hidden md:block'>Home</button>
            <button onClick={() => onCreateClick()} className='font-semibold p-3 px-6 rounded-full text-[25px]'>Create</button>
            <div className='bg-[#e9e9e9] p-3 px-6 gap-3 items-center rounded-full w-full hidden md:flex'>
                <FaSearch className='text-[34px] text-gray-500' />
                <input type="text" placeholder='Search...' className='bg-transparent outline-none w-full text-[25px]' />
            </div>
            <FaBell className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
            <AiFillMessage className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
            {
                session?.user ?
                    // @ts-ignore
                    <Image src={session.user.image} onClick={() => router.push('/' + session.user.email)} alt='user-image' width={60} height={60} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
                    :
                    <button onClick={() => signIn()} className='font-semibold p-2 px-4 text-[25px] rounded-full'>
                        <IoMdLogIn />
                    </button>
            }
        </div>
    )
}

export default Header