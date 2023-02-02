import React, { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaUserAlt, FaPlus, FaGrinStars, FaRegAddressBook } from "react-icons/fa";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  // const location = useLocation();
  // console.log(location);
  const username = localStorage.getItem("username");
  console.log(username);
  function logout() {
    localStorage.removeItem("username");
    window.location.reload();
  }
  return (

    <nav className="bg-white px-2 sm:px-4 py-2.5 :bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 :border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" className="h-10 w-16 mr-3 sm:h-12 rounded-xl" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap :text-white">BookCorner</span>
        </a>
        <div className="flex md:order-2">
          {
            !username
              ? <a href='/login' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Login</a>
              : <button type="button" onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Logout</button>
          }



          <button data-collapse-toggle="navbar-sticky" onClick={() => { setNavbarOpen(!navbarOpen); console.log("a") }} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div
          className={
            "items-center justify-between w-full md:flex md:w-auto md:order-1" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="navbar-sticky">
          <ul className="flex w-full flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white className:bg-gray-800 md::bg-gray-900 :border-gray-700">
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaHome size={25} className='mx-auto hidden md:block' />
              <a href="/" >Home</a>
            </li>
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaPlus size={25}className='mx-auto hidden md:block'  />
              <a href="/post">Post</a>
            </li>
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaSearch size={25} className='mx-auto hidden md:block'  />
              <a href="/search" >Search</a>
            </li>
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaRegAddressBook size={25} className='mx-auto hidden md:block'  />
              <a href="/myposts" >Posts</a>
            </li>
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaGrinStars size={25} className='mx-auto hidden md:block'  />
              <a href="/collections" >Collections</a>
            </li>
            <li className='flex md:block cursor-pointer p-2 md:p-0 block md:py-2 pl-3 pr-4 w-full text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::hover:text-white :text-gray-400 :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700'>
              <FaUserAlt size={25} className='mx-auto hidden md:block'  />
              <a href={`/profile/${username}`} >Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
