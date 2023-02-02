import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    function submit() {
        navigate(`/bookinfo/${props._id}`, { props: props });
    }
    function remove() {
        axios.post("http://localhost:8000/removefromcollections", { username: username, id: props._id })
            .then((data) => {
                console.log(data.data);
                props.getcollections();
            })
            .catch((err) => console.log(err));
    }
    return (
            <div  class="my-4 items-center md:flex bg-white border rounded-lg shadow-md md:flex-row ">
                <a onClick={submit} className='w-full md:flex  cursor-pointer'>
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-32 md:w-[6rem] md:rounded-none md:rounded-l-lg" src={props.image} alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <p class="mb-2 text-xl font-bold tracking-tight text-gray-900 bold ">{props.bookName}</p>
                        <p>{props.likes} likes</p>
                    </div>

                </a>
                <button onClick={remove} class="float-rigth mr-4 font-sm bg-transparent hover:bg-red-500 text-red-700 f hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                    Remove
                </button>
            </div>
    )
}
