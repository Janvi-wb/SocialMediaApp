/* eslint-disable no-unused-vars */
import "./home.scss";
import { useGetAllPostsQuery } from "../../../store/postApiSlice";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { useProfile } from "./hooks/useProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllPosts } from "../../../store/allPostsSlice";
import Post from "./components/Post";
import PostShimmer from "../../Shimmers/PostShimmer";

const Home = () => {
  const dispatch = useDispatch();
  const { data: allPost, isLoading, error } = useGetAllPostsQuery({page: 1, limit:10});
  const { isLoading: isProfileLoading, isError: profileError } = useProfile();

  useEffect(() => {
    if (allPost?.data?.posts) {
      dispatch(addAllPosts(allPost.data.posts));
    }
  }, [allPost, dispatch]);

  const posts = allPost?.data?.posts || [];

  if (isLoading || isProfileLoading)
    return Array.from({ length: 3 }, (_, index) => <PostShimmer key={index} />);
  if (error || profileError) return <p>Error fetching posts</p>;

  return (
    <div className="instagram-home">
      <TopBar />
      <div className="post-section">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;

