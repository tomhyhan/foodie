import React from 'react'
import { IconType } from 'react-icons/lib';
import {CgProfile, CgAddR, CgLogOut, CgHome} from 'react-icons/cg';
import {AiOutlineSearch} from 'react-icons/ai';

type NavbarBtnProps = {
    title: string,
    onClick: () =>void,
    icon: IconType
}

// CgHome
const OPTION = "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"

export default function NavbarBtn({title,onClick,icon}:NavbarBtnProps) {
  return (
    <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={onClick}>
    {get_icon(icon)}
    <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
</div>
  )
}


function get_icon(icon: IconType) {
  switch (icon) {
    case CgHome:
      return <CgHome className={OPTION}/>
    case CgAddR:
      return <CgAddR className={OPTION}/>
    case CgLogOut:
      return <CgLogOut className={OPTION}/>
    case AiOutlineSearch:
      return <AiOutlineSearch className={OPTION}/>
    case CgProfile:
      return <CgProfile className={OPTION}/>
    default:
      new Error("unknonw icon type")
  }
}