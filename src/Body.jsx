import Loginn from "./features/Auth/Loginn";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./features/Home/Home";
import Profile from "./features/Profile/Profile";
import PostModal from "./features/Profile/components/PostModal";
import FollowerModal from "./features/Profile/components/FollowerModal";
import FollowingModal from "./features/Profile/components/FollowingModal";
import Comment from "./features/Comment/Comment";
import CreatePost from "./features/Profile/components/CreatePost";
import Explore from "./Explore/Explore";
import Logout from "./features/Auth/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCredentials } from "../store/userSlice";
import EditProfile from "./features/Profile/components/EditProfile";
import Search from "./features/Home/components/Search";
import TopBar from "./features/Home/components/TopBar";
import Footer from "./features/Home/components/Footer";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const token = useSelector(store => store?.user?.token) || localStorage.getItem('accessToken');
  return token ? element : <Navigate to="/" />;
};

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ element }) => {
  const token = useSelector(store => store?.user?.token) || localStorage.getItem('accessToken');
  return token ? <Navigate to="/home" /> : element;
};

const Body = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if(user && accessToken) {
      dispatch(addCredentials({ user: JSON.parse(user), token: accessToken }));
    }
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute element={<Loginn />} />
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Home />} />
    },
    {
      path: "/profile",
      element: <ProtectedRoute element={<Profile />} />
    },
    {
      path: "/post/:id",
      element: <ProtectedRoute element={<PostModal />} />
    },
    {
      path: "/followers/:username",
      element: <ProtectedRoute element={<FollowerModal />} />
    },
    {
      path: "/following/:username",
      element: <ProtectedRoute element={<FollowingModal />} />
    },
    {
      path: "comments/:id",
      element: <ProtectedRoute element={<Comment />} />
    },
    {
      path: "/createPost",
      element: <ProtectedRoute element={<CreatePost />} />
    },
    {
      path: "/profile/:username",
      element: <ProtectedRoute element={<Profile />} />
    },
    {
      path: "/explore",
      element: <ProtectedRoute element={<Explore />} />
    },
    {
      path: "/logout",
      element: <ProtectedRoute element={<Logout />} />
    },
    {
      path : "/profile/edit",
      element: <EditProfile />
    },
    {
      path : "/search",
      element: <><TopBar /><Search /><Footer /></>
    },
    {
      path: "*",
      element: <Navigate to="/" />
    }
  ]);
  
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
