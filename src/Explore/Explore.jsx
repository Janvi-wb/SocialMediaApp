/* eslint-disable react/prop-types */
import "./Explore.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
import TopBar from "../features/Home/components/TopBar";
import Footer from "../features/Home/components/Footer";

const Explore = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: newPost } = useGetAllPostsQuery({ page: page, limit: 20 });

  useEffect(() => {
    if (newPost?.data?.posts) {
      setPosts((prevPosts) => [...prevPosts, ...newPost.data.posts]);
      setLoading(false);
    }
  }, [newPost]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 500 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

   window.addEventListener("scroll", handleScroll);
  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  return (
    <>
    <TopBar />
    <div className="explore_wrapper">
      <div className="explore_container">
        {posts.map((post) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="explore_post"
          >
            <img
              src={post.images[0]?.url || "https://via.placeholder.com/300x300"}
              alt="Post"
              className="explore_image"
            />
          </Link>
        ))}
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Explore;
