import { useEffect, Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Loginn from "./features/Auth/Loginn";
import Home from "./features/Home/Home";
import Logout from "./features/Auth/Logout";
import { useDispatch, useSelector } from "react-redux";
import { addCredentials } from "../store/userSlice";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const Profile = lazy(() => import("./features/Profile/Profile"));
const PostModal = lazy(() => import("./features/Profile/components/PostModal"));
const FollowerModal = lazy(() =>
  import("./features/Profile/components/FollowerModal")
);
const FollowingModal = lazy(() =>
  import("./features/Profile/components/FollowingModal")
);
const Comment = lazy(() => import("./features/Comment/Comment"));
const CreatePost = lazy(() =>
  import("./features/Profile/components/CreatePost")
);
const Explore = lazy(() => import("./Explore/Explore"));
const EditProfile = lazy(() =>
  import("./features/Profile/components/EditProfile")
);
const Search = lazy(() => import("./features/Home/components/Search"));
const TopBar = lazy(() => import("./features/Home/components/TopBar"));
const Footer = lazy(() => import("./features/Home/components/Footer"));

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const token =
    useSelector((store) => store?.user?.token) ||
    localStorage.getItem("accessToken");
  return token ? element : <Navigate to="/" />;
};

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ element }) => {
  const token =
    useSelector((store) => store?.user?.token) ||
    localStorage.getItem("accessToken");
  return token ? <Navigate to="/home" /> : element;
};

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    if (user && accessToken) {
      dispatch(addCredentials({ user: JSON.parse(user), token: accessToken }));
    }
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute element={<Loginn />} />,
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Home />} />,
    },
    {
      path: "/profile",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<Profile />} />
        </Suspense>
      ),
    },
    {
      path: "/post/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<PostModal />} />
        </Suspense>
      ),
    },
    {
      path: "/followers/:username",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<FollowerModal />} />
        </Suspense>
      ),
    },
    {
      path: "/following/:username",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<FollowingModal />} />
        </Suspense>
      ),
    },
    {
      path: "comments/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<Comment />} />
        </Suspense>
      ),
    },
    {
      path: "/createPost",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<CreatePost />} />
        </Suspense>
      ),
    },
    {
      path: "/explore",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<Explore />} />
        </Suspense>
      ),
    },
    {
      path: "/profile/edit",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute element={<EditProfile />} />
        </Suspense>
      ),
    },
    {
      path: "/search",
      element: (
        <Suspense fallback={<Loader />}>
          <>
            <TopBar />
            <Search />
            <Footer />
          </>
        </Suspense>
      ),
    },
    {
      path: "/logout",
      element: <ProtectedRoute element={<Logout />} />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Body;
