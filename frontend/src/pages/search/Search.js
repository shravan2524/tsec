import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card';

export default function Search() {
  const [flats, setFlats] = useState([]);
  const [hflats, setHflats] = useState([]);
  const [search, setsearch] = useState("");

  function changesearch(e) {
    console.log(e);
    setsearch(e);
    const result = [];
    for (var i = 0; i < hflats.length; i++) {
      if (hflats[i].address.toLowerCase()
        .includes(search.toLowerCase())) {
        result.push(flats[i]);
      }
    }
    console.log(result);
    setFlats(result);

  }
  useEffect(() => {
    axios.get("http://localhost:8000/flats")
      .then((data) => {
        console.log(data.data);
        setFlats(data.data);
        setHflats(data.data);
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='mt-[10vh] mx-auto w-[90%] p-4 '>
      <div>
        <input placeholder='Search' class="px-4 py-2 border focus:ring-gray-500  focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" value={search} onChange={(e) => changesearch(e.target.value)} />
      </div>
      <div className='md:grid md:grid-cols-3 lg:grid-cols-4 justify-between gap-x-5'>
        {
          flats.length > 0
            ? flats.map((data) => {
              return <Card {...data} />
            })
            : null
        }
      </div>
    </div>
  )
}
