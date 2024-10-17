import Loginn from "../features/Auth/Login";
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../features/Home/Home";

const Body = () => {

   const appRouter = createBrowserRouter([
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