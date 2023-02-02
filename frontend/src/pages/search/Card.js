import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const navigate = useNavigate();
    function submit() {
        navigate(`/bookinfo/${props._id}`, { props: props });
    }

    return (
        <div  class="my-4 items-center bg-white border rounded-lg shadow-md  ">
        <a onClick={submit} className='w-full cursor-pointer'>
            <img class="object-cover w-full h-[30vh] rounded-t-lg h-96  md:rounded-none " src={props.cover_img} alt="" />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <p class="mb-2 text-xl font-medium tracking-tight text-gray-900 bold ">{props.title}</p>
                <div className='flex justify-between'>
                <p>{props.address}</p>
                </div>

            </div>

        </a>
        </div>
    )
}