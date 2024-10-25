import Loginn from "../features/Auth/Loginn";
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../features/Home/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addCredentials } from "../../store/userSlice";
import Profile from "../features/Profile/Profile";
import PostModal from "../features/Profile/components/PostModal";
import FollowerModal from "../features/Profile/components/FollowerModal";
import FollowingModal from "../features/Profile/components/FollowingModal";
import Comment from "../features/Comment/Comment";

const Body = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if(user && accessToken) {
      dispatch(addCredentials({user:JSON.parse(user), token: accessToken}));
    }
  },[]);

   const appRouter = createBrowserRouter([
    {
      path: "*",
      element: <Loginn />
    },
    {
        path: "/",
        element: <Loginn />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/post/:id",
      element: <PostModal />
    },
    {
      path: "/followers/:username",
      element: <FollowerModal />
    },
    {
      path: "/following/:username",
      element: <FollowingModal />
    },
    {
      path: "comments/:id",
      element: <Comment />
    }
   ])
   
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;