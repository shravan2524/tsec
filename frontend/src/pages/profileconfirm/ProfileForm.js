import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProfileForm = props => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [education, setEducation] = useState(0);
    const [hsc,setHsc]=useState("");
    const [undergrad,setUndergrad]=useState("");
    const [master,setMasters]=useState("");
    const [phd,setPhd]=useState("");
    const navigate=useNavigate();

    const onSubmit = (formData) => {
        console.log(formData);
        // axios.post("http://localhost:8000/profiledata", {data:formData})
        // .then((data) => {
        //     console.log(data);
        //      toast('Login Successfully');
            // navigate("/");
        // })
        // .catch((err) => console.log(err));
    }

    const handleAddEducation = () => {
        if (education < 4) {
            setEducation(prevState => prevState + 1);
        }
    }
    const handleRemoveEducation = () => {
        if (education > 0) {
            setEducation(prevState => prevState - 1);
        }
        if(education==0){
            setHsc("");
        }
        if (education==1) {
            setMasters("");
        }
        if (education==2) {
            setPhd("");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:w-1/2 w-4/5 mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className=" mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">B</div>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Profile Form</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Please Enter your details</p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Full Name</label>
                                        <input type="text" {...register("fullname")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Full Name" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Age</label>
                                        <input type="text" {...register("age")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Age" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Gender</label>
                                        <select id="gender">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h2 className="leading-relaxed">Education</h2>
                                        <hr className='w-4/5 h-0.5 bg-slate-100 mt-1' />
                                        <div className="flex flex-col">
                                            <label className="leading-loose">SSC</label>
                                            <input type="text" {...register("ssc")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="SSC" />
                                            {!(education >= 1) && <button type="button" onClick={handleAddEducation} className="mt-2 w-1/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Add</button>}
                                        </div>
                                        {education >= 1 && <div className="flex flex-col">
                                            <label className="leading-loose">HSC</label>
                                            <input type="text" {...register("hsc")} onChange={(e) => setHsc(e.target.value)} value={hsc} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="HSC" />
                                            {!(education >= 2) && <div className='flex flex-row justify-between mt-3'>
                                                <button type="button" onClick={handleAddEducation} className=" text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Add</button>
                                                <button type="button" onClick={handleRemoveEducation} className="text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Remove</button>
                                            </div>}
                                        </div>}
                                        {education >= 2 && <div className="flex flex-col">
                                            <label className="leading-loose">Undergrad University/College</label>
                                            <input type="text" {...register("undergrad")} onChange={(e) => setUndergrad(e.target.value)} value={undergrad} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Undergrad" />
                                            {!(education >= 3) && <div className='flex flex-row justify-between mt-3'>
                                                <button type="button" onClick={handleAddEducation} className=" text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Add</button>
                                                <button type="button" onClick={handleRemoveEducation} className="text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Remove</button>
                                            </div>}
                                        </div>}
                                        {education >= 3 && <div className="flex flex-col">
                                            <label className="leading-loose">Masters University/College</label>
                                            <input type="text" {...register("masters")} onChange={(e) => setMasters(e.target.value)} value={master}  required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Masters" />
                                            {!(education >= 4) && <div className='flex flex-row justify-between mt-3'>
                                                <button type="button" onClick={handleAddEducation} className=" text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Add</button>
                                                <button type="button" onClick={handleRemoveEducation} className="text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Remove</button>
                                            </div>}
                                        </div>}
                                        {education >= 4 && <div className="flex flex-col">
                                            <label className="leading-loose">PhD University/College</label>
                                            <input type="text" {...register("phd")} required onChange={(e) => setPhd(e.target.value)} value={phd} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Phd" />
                                            <div className='flex flex-row justify-between mt-3'>
                                                <button type="button" onClick={handleAddEducation} className=" text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Add</button>
                                                <button type="button" onClick={handleRemoveEducation} className="text-white w-1/4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Remove</button>
                                            </div>
                                        </div>}
                                    </div>
                                    <hr className='w-4/5 h-0.5 bg-slate-100 mt-1' />
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Current Organization Name</label>
                                        <input type="text" {...register("workplace")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Enter Your current Workplace" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Work Experience</label>
                                        <input type="text" {...register("workexperience")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Enter your Work Experience" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Smoking/Drinking Habits</label>
                                        <div className='flex flex-col sm:flex-row justify-between mx-3 w-2/3' >
                                            <div>
                                                <label className='leading leading-loose mr-2'>Yes</label>
                                                <input id='smokedrinkyes' type="radio" {...register("smokingdrinking", { required: true })} value="Yes" />
                                            </div>
                                            <div>
                                                <label className='leading leading-loose mr-2'>No</label>
                                                <input id='smokedrinkno' type="radio" {...register("smokingdrinking", { required: true })} value="No" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Late Night Commune</label>
                                        <div className='flex flex-col sm:flex-row justify-between mx-3 w-2/3' >
                                            <div>
                                                <label className='leading leading-loose mr-2'>Yes</label>
                                                <input id='latenightyes' type="radio" {...register("latenight", { required: true })} value="Yes" />
                                            </div>
                                            <div>
                                                <label className='leading leading-loose mr-2'>No</label>
                                                <input id='latenightno' type="radio" {...register("latenight", { required: true })} value="No" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Preferred Food</label>
                                        <input type="textarea" {...register("workexperience")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Preferred food" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Hobbies</label>
                                        <input type="textarea" {...register("workexperience")} required className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Hobbies" />
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button type="submit" className="bg-[#1b72e8] flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProfileForm