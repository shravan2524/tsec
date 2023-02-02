import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Card from './Card';

export default function Home() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/getallpost" )
    .then((data) => {
      console.log(data);
      setposts(data.data);
    })
    .catch((err) => console.log(err))
  }, [])
  

  return (
    <div className='my-[10vh] mx-auto md:w-4/12'>
      {
        posts
        ? posts.map((data) => {
          return <Card {...data} />
        })
        : null
      }

    </div>
  )
}
