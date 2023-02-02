import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        axios.post("http://localhost:8000/login", {data:formData})
        .then((data) => {
            console.log(data.data);
            if(data.data.mes==="username / password is wrong"){
              toast.error("username / password is wrong");
              navigate("/login");
            }
            else{
              console.log("hello");
            toast.success('Login Successfully');
            localStorage.setItem("email", data.data.mes[0].email);
            navigate("/");
            }
        })
        .catch((err) => console.log(err));
    }

  return (
    <div>
      <Toaster /> 
       <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">B</div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">Login</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">The power to be found between the pages of a book is formidable, indeed. ...</p>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div class="flex flex-col">
              <label class="leading-loose">Email </label> 
              <input type="text" {...register("email")} required class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Username" />
            </div>
            <div class="flex flex-col">
              <label class="leading-loose">Password</label>
              <input type="password" {...register("password")} required class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Password" />
            </div>
          </div>
          <div class="pt-4 flex items-center space-x-4">
              <button type="submit"  class="bg-[#1b72e8] flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">login</button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}
