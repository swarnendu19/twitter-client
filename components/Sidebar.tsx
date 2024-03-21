import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { IoCheckboxOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";



interface TwitterSidebarButton{
  title: string;
  icon:React.ReactNode;
}

const SidebarMenu: TwitterSidebarButton[]=[
  {
    title: "Home",
    icon: <GoHomeFill />
  },
  {
    title: "Explore",
    icon: <IoSearch /> 
  },
  {
    title: "Notification",
    icon: <IoIosNotificationsOutline />
  },
  {
     title: "Message",
     icon: <FaMessage />
  },
  {
    title: "Gork",
    icon: < IoCheckboxOutline />
  },
  {
    title: "Lists",
    icon: <LiaClipboardListSolid />
  },
  {
    title: "Profile",
    icon: <CgProfile />
  },
  {
    title: "More",
    icon: <CiCircleMore />
  }
]

function Sidebar() {
  return (
    <div className='col-span-3  justify-start pt-5'>
      <div  className='text-3xl flex h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-all' >
      <FaXTwitter/>
      </div>
      <div className='mt-4 text-2xl font-bold pr-4'>
        <ul>
        {
          SidebarMenu.map((item)=>(
          <li className='flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-3 w-fit cursor-pointer ' 
          key={item.title}>
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </li> 
          ))
        }
        </ul>
        <button className='bg-[#1C98EB] p-4 rounded-full w-full mt-5'>
         Post
        </button>
      </div>
    </div>
  )
}

export default Sidebar
