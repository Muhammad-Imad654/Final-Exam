import React from 'react'
import { SiMeta } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlinePhoneAndroid } from "react-icons/md";

const Topbar = () => {
    return (
        <div className='bg-indigo-600 text-white'>
            <div className="container mx-auto flex justify-between items-center">
                <div className=' hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <SiMeta className='h-7 w-7' />
                    </a>
                    <a href="#" className='hover:text-zinc-300'>
                        <FaInstagram className='h-7 w-7' />
                    </a>
                    <a href="#" className='hover:text-zinc-300'>
                        <RiTwitterXFill className='h-7 w-7' />

                    </a>
                </div>
                <div className="text-sm text-center flex-grow">
                    <span>"Wear your confidence with Wearly — Fashion that feels like you!" 👕👖</span>
                </div>
                <div className="hidden text-sm md:flex items-center">
                <MdOutlinePhoneAndroid /><a href="tel:+12345678" className='hover:text-zinc-300'>+1 {234} 567-890</a>
                </div>
            </div>
        </div>
    )
}

export default Topbar
