import React, {useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Search from './pages/search/Search';
import BookInfo from './pages/search/BookInfo';
import Post from './pages/post/Post';
import Collections from './pages/collections/Collections';
import { useNavigate } from "react-router-dom";
import MyPost from './pages/mypost/MyPost';
import ProfileForm from './pages/profileconfirm/ProfileForm';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected >
    <Home />
    </Protected>
  },
  {
    path: "/profile",
    element:<Protected ><Profile /></Protected>,
  },
  {
    path: "/signup",
    element:<Signup />,
  },
  {
    path: "/login",
    element:<Login />,
  },
  {
    path: "/search",
    element:<Protected><Search /></Protected>
  },
  {
    path: "/post",
    element:<Protected><Post /></Protected>
  },
  {
    path: "/bookinfo/:id",
      element:<Protected><BookInfo /></Protected>
  },
  {
    path: "/profile/:username",
      element:<Protected><Profile /></Protected>,
  },
  {
    path: "/collections",
      element:<Protected><Collections /></Protected>,
  },
  {
    path: "/myposts",
      element:<Protected><MyPost /></Protected>,
  },
  {
    path:"/profileform",
    element:<Protected><ProfileForm /></Protected>
  }
]);
function Protected({  children }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("email");
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
 

  return (
    <div>
    <Navbar />
    <RouterProvider router={router} />
    {/* <ProfileForm /> */}
    </div>
  );
}

export default App;
