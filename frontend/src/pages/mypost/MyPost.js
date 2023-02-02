import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Card from './Card';

export default function MyPost() {
  const [posts, setposts] = useState([]);
  const [collections, setcollections] = useState([]);
  const username = localStorage.getItem("username");
    function getCommon(arr1, arr2) {
        var common = [];                  
        for(var i=0 ; i<arr1.length ; ++i) {
          for(var j=0 ; j<arr2.length ; ++j) {
            if(arr1[i] == arr2[j]._id) {      
              common.push(arr2[j]);       
            }
          }
        }
        console.log(common, arr1, arr2, "gvjc");
        return common;
      }
      function getcollections(){
        axios.post("http://localhost:8000/getuserpost", { username: username })
        .then((data) => {
            console.log(data.data);
            setcollections(data.data);
            axios.get("http://localhost:8000/getallpost")
            .then((data1) => {
              console.log(data1.data);
              setposts(getCommon(data.data, data1.data));
            })
            .catch((err)=>console.log(err))
            
        })
        .catch((err) => console.log(err));
      }
    useEffect(() => {
      getcollections();
    }, [])

  return (
    <div className='my-[10vh] mx-auto md:w-4/12'>
      <span className='font-bold text-2xl pl-4 mx-auto'>My Posts</span>
      {
        posts
        ? posts.map((data) => {
          return <Card props={data} getcollections={getcollections} />
        })
        : <p className='mt-6'>Oops, Your Collection is empty</p>
      }

    </div>
  )
}
