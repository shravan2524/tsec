import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Uploader from "./Uploader";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import UserName from '../../components/UserName';

export default function Login() {
    const username = localStorage.getItem("username")
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imagePreSignedUrl, setimagePreSignedUrl] = useState("");
    const onSubmit = (formData) => {
        axios.post("http://localhost:8000/post", { formData, imagePreSignedUrl, username: username})
            .then((data) => {
                console.log(data.data);
                toast('Posted Sucessfully');
                navigate("/");

            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <Toaster /> 
            
            <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
               
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
           
                <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div>
                    <h5 className='font-bold text-2xl underline'>YOUR POST</h5>
                </div>
                    <div class="max-w-md mx-auto">
                        <div class="divide-y divide-gray-200">

                            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <Uploader setimagePreSignedUrl={setimagePreSignedUrl} />
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div class="flex flex-col">
                                        <input type="text" {...register("title")} required class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Title" />
                                    </div>
                                    <div class="flex flex-col">
                                        <input type="text" {...register("description")} required class="px-4 my-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="description" />
                                    </div>

                                    <div class="pt-4 flex items-center space-x-4">
                                        <button type="submit" class="bg-[#1b72e8] flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}
