import Loginn from "../features/Auth/Loginn";
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../features/Home/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addCredentials } from "../../store/userSlice";

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
    }
   ])
   
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;