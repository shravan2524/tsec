import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Collections() {
    const [collections, setcollections] = useState([]);
    const [books, setbooks] = useState([]);
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
        axios.post("http://localhost:8000/getcollections", { username: username })
        .then((data) => {
            console.log(data.data);
            setcollections(data.data);
            axios.get("http://localhost:8000/books")
            .then((data1) => {
              console.log(data1.data);
              setbooks(getCommon(data.data, data1.data));
            })
            .catch((err)=>console.log(err))
            
        })
        .catch((err) => console.log(err));
      }
    useEffect(() => {
      getcollections();

       
    }, [])
    
  return (
    <div className='mt-[10vh] mx-auto md:w-6/12 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
        <h2 className='font-lg text-4xl'>Your's Collection</h2>
    {
        books.length>0
        ? books.map((data) => {
            return <Card {...data} getcollections={getcollections} />
        })
        : <p className='mt-6'>Oops, Your Collection is empty</p>
    }
    </div>
  )
}
