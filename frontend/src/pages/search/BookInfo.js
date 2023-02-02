import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaRegHeart, FaHeart, FaGrinStars, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { SiFigshare } from "react-icons/si";
import { useLocation } from 'react-router-dom';
import UserName from '../../components/UserName';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Like = ({ setLike, like, _id, likes, fetchBooks, username }) => {

    function submit() {
        setLike(!like);
        if (!like) {
            axios.post("http://localhost:8000/liketobook", { _id, likes: likes + 1 })
                .then((data) => {
                    console.log(data.data);
                    fetchBooks();
                    toast.success('You liked the post');
                })
                .catch((err) => console.log(err));
        }
        else {
            axios.post("http://localhost:8000/liketobook", { _id, likes: likes - 1 })
                .then((data) => {
                    console.log(data);
                    fetchBooks();
                    toast.error('You Disliked the post');
                })
                .catch((err) => console.log(err));
        }


    }
    return (
        <div>
            <span onClick={submit} className='cursor-pointer text-yellow'>
                {
                    !like
                        ? <FaRegThumbsUp size={30} color={"#1b72e8"} />
                        : <FaThumbsUp size={30} color={"#1b72e8"} />
                }
            </span>
            <span className='font-[#1b72e8]'>{likes} likes</span>
        </div>
    )
}

const CommentCard = ({ username, comment }) => {
    return (
        <div className='flex m-4'>
            <div>
                <FaUser size={40} />
            </div>
            <div className=' justify-between ml-4 bg-[#f2f2f2] p-2 rounded-lg w-full'>
                <div class="justify-between ">
                    <p class=" text-xs font-bold tracking-tight text-gray-900 "> <UserName username={username} /></p>
                </div>
                <div>
                    <p className='text-xs text-gray-900 text-sm'>{comment}</p>
                </div>
            </div>
        </div>
    )
}

const Comment = ({ comment, id, comments, fetchComments, username }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        axios.post("http://localhost:8000/postcommenttobook", { formData, id, username: username })
            .then((data) => {
                console.log(data);
                toast.success('Posted your comment successfully');
                fetchComments();
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className='mt-6'>
            <Toaster /> <div class="flex flex-col w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex'>
                        <input type="text" {...register("comment")} required class="p-2 border focus:ring-gray-500 mr-4 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Add a comment" />
                        <button type="submit" class="w-32 bg-[#1b72e8] flex justify-center items-center w-full font-sm text-white p-2 rounded-md focus:outline-none">post</button>
                    </div>
                </form>
            </div>
            {
                comments.map((data) => {
                    return <CommentCard {...data} />
                })

            }

        </div>
    )
}

export default function BookInfo() {
    const username = localStorage.getItem("email");
    const items = useParams();
    const [flatInfo, setflatInfo] = useState([]);
    // const [like, setLike] = useState(false);
    // const [comments, setcomments] = useState([]);
    // function fetchComments() {
    //     axios.post("http://localhost:8000/getcommentsofbook", { id: bookInfo._id })
    //         .then((data) => {
    //             setcomments(data.data);
    //         })
    //         .catch((err) => console.log(err));
    // }
    function fetchBooks() {
        axios.post("http://localhost:8000/flatid", { data: items.id })
            .then((data) => {
                setflatInfo(data.data);
                console.log(flatInfo);
                // setcomments(data.data.comments);
            })
            .catch((err) => console.log(err));
    }
    function intrested() {
        axios.post("http://localhost:8000/intrested", { id: flatInfo._id, username })
            .then((data) => {
                toast.success('Intrested');
                console.log(data);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        // fetchComments();
        fetchBooks();
    }, []);

    return (
        <div className='mt-[10vh] mx-auto md:w-7/12'>
            <Toaster />
            <div class=" items-center bg-white border rounded-lg shadow-md md:flex-row p-4 md:max px-6">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{flatInfo.title}</h5>
                <div className='grid grid-cols-2 gap-x-4'>
                    <img class="object-cover w-full rounded-l-lg h-[32vh] mx-auto" src={flatInfo.cover_img} alt="" />
                    <div className='grid grid-cols-2 gap-4'>
                        <img class="object-cover   h-[15vh] w-[30vh]  mx-auto" src={flatInfo.images ? flatInfo.images[0] : null} alt="" />
                        <img class="object-cover  rounded-tr-lg h-[15vh] w-[30vh]  mx-auto" src={flatInfo.images ? flatInfo.images[1] : null} alt="" />
                        <img class="object-cover   h-[15vh] w-[30vh] mx-auto" src={flatInfo.images ? flatInfo.images[2] : null} alt="" />
                        <img class="object-cover  rounded-br-lg h-[15vh] w-[30vh]  mx-auto" src={flatInfo.images ? flatInfo.images[3] : null} alt="" />
                    </div>
                </div>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="text-xl font-normal tracking-tight text-gray-900 ">{flatInfo.address}</h5>
                    <div className='flex my-2'>
                        {
                            flatInfo.config
                                ? flatInfo.config.map((data) => {
                                    return <span className='mr-4 flex max-w-prose gap-x-1'><SiFigshare className='m-auto ' />{data}</span>
                                })
                                : null
                        }
                    </div>
                    <div className='flex my-2 gap-x-2'>
                        {
                            flatInfo.tags
                                ? flatInfo.tags.map((data) => {
                                    return data === "girls"
                                        ? <div className='bg-pink-600 px-4 py-1 text-white rounded-lg'>{data}</div>
                                        : <div className='bg-purple-600 px-4 py-1 text-white rounded-lg'>{data}</div>
                                })
                                : null
                        }

                    </div>
                    <h5 class="text-xl font-normal tracking-tight text-gray-900 ">{flatInfo.displayPrice}</h5>
                    <p class="mt-6  font-normal text-gray-700 ">{flatInfo.description}</p>
                    <div className='flex justify-around h-[3rem]'>
                        <div className='border-[1px] border-grey w-33%'></div>
                        <div className='flex' class="float-rigth flex font-xs bg-transparent hover:bg-[#1b72e8] text-[#1b72e8] f hover:text-white p-2 border border-[#1b72e8] hover:border-transparent rounded">
                            <FaGrinStars className='my-auto' color='#1b72e8' size={20} />
                            <button className='text-[12px]' onClick={intrested}>Intrested</button>
                        </div> *
                    </div>
                    {/* <Comment username={username} fetchComments={fetchComments} id={bookInfo._id} comments={comments} /> */}

                </div>
            </div>

        </div>
    )
}
