import Footer from "../Home/components/Footer";
import TopBar from "../Home/components/TopBar";
import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import "./Profile.scss";
import { useMyPost } from "./hooks/useMyPost";
import { useState } from "react";
import { useGetBookmarkedPostsQuery } from "../../../store/profileApiSlice";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  const userName = location.pathname.split("/")[2];

  const [view, setView] = useState("posts");
  const { posts: myPosts } = useMyPost();
  const { data, isLoading } = useGetBookmarkedPostsQuery();

  if (isLoading) return <p>Loading...</p>;

  const bookmarkedPosts = data?.data?.bookmarkedPosts;

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="profile-container">
      <TopBar />
      <Header />
      <div className="content">
        <div className="post-navigation">
          <i
            onClick={() => handleViewChange("posts")}
            className="fa fa-th"
            aria-hidden="true"
          ></i>
          {!userName &&
          <i
            onClick={() => handleViewChange("bookmarks")}
            className="fa fa-bookmark"
            aria-hidden="true"
          ></i>
          }
        </div>
        <PostGrid posts={view === "bookmarks" ? bookmarkedPosts : myPosts} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
