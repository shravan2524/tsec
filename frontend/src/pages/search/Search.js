import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Card from './Card';

export default function Search() {
    const [books, setbooks] = useState([]);
    const [Hbooks, setHbooks] = useState([])
    const [search, setsearch] = useState("");

    function changesearch(e){
      console.log(e);
      setsearch(e);
      const result = [];
      for (var i = 0; i < Hbooks.length; i++) {
        if(Hbooks[i].bookName.toLowerCase()
                .includes(search.toLowerCase())) {
            result.push(books[i]);
        }
    }
      console.log(result);
      setbooks(result);

    }
    useEffect(() => {
      axios.get("http://localhost:8000/books")
      .then((data) => {
        console.log(data.data);
        setbooks(data.data);
        setHbooks(data.data);
      })
      .catch((err)=>console.log(err))
    }, [])
    
  return (
    <div className='mt-[10vh] mx-auto md:w-6/12 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
      <div>
        <input placeholder='Search' class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" value={search} onChange={(e) => changesearch(e.target.value)} />
      </div>
        {
            books.length>0
            ? books.map((data) => {
                return <Card {...data} />
            })
            :null
        }
        <div>
          <input type="text" placeholder="New Text Search Box" /> 
          
        </div>
        </div>
  )
}
