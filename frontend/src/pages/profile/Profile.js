import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FaUser } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const items = useParams();
  const [userData, setuserData] = useState([]);
  const [likes, setlikes] = useState(0);
  const [posts, setposts] = useState(0);
  const username = localStorage.getItem("username");
  
  function follow(){
    axios.post("http://localhost:8000/follow", {username:userData.username, currentUserName:username})
    .then((data) => {
      console.log(data);
       toast.success(`you are following ${username}`);
    })
    .catch((err)=> console.log(err));
  }

  useEffect(() => {
    axios.post("http://localhost:8000/profile", {data: items.username})
    .then((data) => {
      setuserData(data.data);

        console.log(data.data);
        const templ = userData.followers, tempp = userData.posts;
        setlikes(templ.length);
        setposts(tempp.length);
    })
    .catch((err) => console.log(err));
}, [])

  return (
    <div>
      <Navbar />
       <Toaster /> 
    <div className='mt-[10vh] mx-auto md:w-6/12'>
      <div class=" bg-white border rounded-lg shadow-md ">
        <div className='flex m-8 p-4 flex-col items-center flex m-8 p-4 flex-col items-center'>
        <FaUser size={100} />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <p class="mb-2 text-xl font-bold tracking-tight text-gray-900 bold ">{userData.username}</p>
          <p>{userData.name}</p>
          {
            username!=userData.username
            ? <button type="submit" onClick={follow}  class="bg-[#1b72e8] flex justify-center items-center w-full text-white p-2 rounded-md focus:outline-none">Follow</button>
            : null
          }
             
        </div>
        <div className='flex justify-around w-full'>
          <div className='align-center'><p className='font-bold text-4xl text-center'>{userData.posts ? userData.posts.length : 0}</p><p className='text-grey'>Posts</p></div>
          <div className='border-[1px] border-grey'></div>
          <div className='align-center'><p className='font-bold text-4xl text-center'>{userData.followers ? userData.followers.length : 0}</p><p className='text-grey'>Followers</p></div>
          <div className='border-[1px] border-grey'></div>
          <div className='align-center'><p className='font-bold text-4xl text-center'>{userData.followings ? userData.followings.length : 0}</p><p className='text-grey'>Following</p></div>
          </div>

        </div>
        </div>
      </div>

      
    </div>
  )
}
