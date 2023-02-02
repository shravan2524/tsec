import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaRegHeart, FaHeart, FaRegCommentDots, FaThumbsUp, FaRegThumbsUp, FaGrinStars } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserName from '../../components/UserName';
import {ImBin2} from "react-icons/im"

const Like = ({ setLike, like, likes, _id, username }) => {
    
    function submit(){
        setLike(!like);
        if(!like){
            axios.post("http://localhost:8000/addliketopost", {_id, username:username})
            .then((data) => {
                console.log(data);
                toast.success('You liked the post');
            })
            .catch((err) => console.log(err));
        }
        else{
            axios.post("http://localhost:8000/removeliketopost", {_id, username:username})
            .then((data) => {
                console.log(data);
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
                        ? <FaRegThumbsUp className=' text-center mx-auto' size={30} color={"gray"} />
                        : <FaThumbsUp size={30} color={"#1b72e8"} />
                }
            </span>
            <span className='font-[#1b72e8]'>{likes.length + like} likes</span>
        </div>
    )
}


const CommentCard = ({ username, comment }) => {
    return (
        <div className='flex m-4'>
            <div>
            <FaUser size={40}  />
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

const Comment = ({comment, id, comments, Get, username}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        axios.post("http://localhost:8000/postcomment", {formData, id, username:username})
        .then((data) => {
            console.log(data);
             toast.success('Posted your comment successfully');
             Get();
        })
        .catch((err) => console.log(err));
    }
    return (
        <div className='mt-4'>
            <Toaster /> 
            {
                comment
                    ? <div class="flex flex-col w-full">
                        <form onSubmit={handleSubmit(onSubmit)}> 
                        <div className='flex'>
                            <input type="text" {...register("comment")} required class="p-2 border focus:ring-gray-500 mr-4 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Add a comment" />
                                <button type="submit" class="w-32 bg-[#1b72e8] flex justify-center items-center w-full font-sm text-white p-2 rounded-md focus:outline-none">post</button>
                            </div>
                        </form>
                    </div>
                    : null
            }
            {
                comment
                ?  comments.map((data) => {
                    return <CommentCard {...data} />
                })
            :null
            }

        </div>
    )
}

export default function Card({props, getcollections}) {
    const username = localStorage.getItem("username");
    const [comment, setcomment] = useState(false);
    const [like, setLike] = useState(false);
    const [comments, setcomments] = useState([]);
    function Get(){
        axios.post("http://localhost:8000/getcomments", {id:props._id})
        .then((data) => {
            setcomments(data.data);
               
        })
        .catch((err) => console.log(err));
    }

    function remove() {
        axios.post("http://localhost:8000/removepost", { username: username, id: props._id })
            .then((data) => {
                console.log(data.data);
                getcollections();
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        Get();
        props.likes.forEach((e) => {
            console.log(e);
            if(e.username==username){
                setLike(true);
            }
        }) 
       
    }, [])
    

    return (
        <div class="my-8 items-center bg-white border rounded-lg shadow-md md:flex-row p-4 md:max px-6">
            <div className='flex mt-4'>
                <div>
                    <FaUser size={40} />
                </div>
                <div className='flex justify-between w-full'>
                    <div class="flex flex-col justify-between ">
                        <p class=" text-xs font-bold tracking-tight text-gray-900 ">
                            {/* {props.username} */}
                            <UserName username={props.username} />
                            </p>

                        <p class=" font-normal text-gray-700 ">{props.title}</p>
                    </div>
                    <div >
                        <p className='text-xs text-gray-900'>{props.date}</p>
                    </div>
                </div>
            </div>
            <div>
                <p class="mb-3 font-normal text-gray-700 ">{props.description}</p>
            </div>
            <img class="object-cover w-full rounded-lg  md:h-automx-auto" src={props.image} alt="" />
            <div className='flex justify-around mt-2'>
                <Like setLike={setLike} like={like}  {...props} username={username} />
            <div className='border-[1px] border-grey'></div>
            <div className='flex flex-col'>
                <FaRegCommentDots className='cursor-pointer text-center mx-auto' color={"gray"} size={30} onClick={() => setcomment(!comment)} />
                <span className='font-[#1b72e8]'>{comments.length} comments</span>
                </div>
                <div className='border-[1px] border-grey'></div>
                <div>
                <div className='flex flex-col'>
                <ImBin2 className='cursor-pointer text-center mx-auto' color={"gray"} size={30}  onClick={remove} />
                <button className='text-[12px]' onClick={remove}>Remove Post</button>
                        </div>
                         
            </div>
            </div>
           
                <Comment comment={comment} Get={Get} id={props._id} username={username} comments={comments} />
        </div>
    )
}
