import "./home.scss";
import { useGetAllPostsQuery } from "../../../store/postApiSlice";
import TopBar from "./components/TopBar";
import Stories from "./components/Stories";
import Post from "./components/Post";
import Footer from "./components/Footer";
import { useProfile } from "./hooks/useProfile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllPosts } from "../../../store/allPostsSlice";

const Home = () => {

  const dispatch = useDispatch();

  const { data: allPost, isLoading, error } = useGetAllPostsQuery();
  const {isLoading: isProfileLoading, isError: profileError} = useProfile();

  useEffect(() => {
    dispatch(addAllPosts(allPost?.data?.posts));
  }, []);

  // const posts = allPost?.data?.posts || [];
  const posts = useSelector(store => store.allPosts.allPosts);
  
  if (isLoading ||  isProfileLoading) return <h4>Loading...</h4>;
  if (error || profileError) return <p>Error fetching posts</p>;

  return (
    <div className="instagram-home">
      <TopBar />

      {posts?.length > 0 && (
        <Stories />
      )}

      <div className="post-section">
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;



// import "./home.scss";
// import { useState, useEffect, useCallback } from "react";
// import { useGetAllPostsQuery } from "../../../store/postApiSlice";
// import TopBar from "./components/TopBar";
// import Stories from "./components/Stories";
// import Post from "./components/Post";
// import Footer from "./components/Footer";
// import { useProfile } from "./hooks/useProfile";

// const Home = () => {
//   const [page, setPage] = useState(1);
//   const [allPosts, setAllPosts] = useState([]);
//   const { data, isLoading, error } = useGetAllPostsQuery({ page, limit: 10 });
  
//   const { isLoading: isProfileLoading, isError: profileError } = useProfile();

//   useEffect(() => {
//     if (data?.data?.posts) {
//       setAllPosts((prevPosts) => [...prevPosts, ...data.data.posts]);
//     }
//   }, [data]);

//   const loadMorePosts = useCallback(() => {
//     setPage((prevPage) => prevPage + 1);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
//         loadMorePosts();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loadMorePosts]);

//   if (isLoading || isProfileLoading) return <h4>Loading...</h4>;

//   if (error || profileError) return <p>Error fetching posts</p>;

//   return (
//     <div className="instagram-home">
//       <TopBar />

//       {allPosts.length > 0 && <Stories />}

//       <div className="post-section">
//         {allPosts.map((post, index) => (
//           <Post
//             key={index + Math.random()}
//             profilePicture={post.author?.coverImage?.url}
//             profileName={`${post.author?.firstName} ${post.author?.lastName}`}
//             postImage={
//               post.images?.[0]?.url || "https://via.placeholder.com/800x450.png"
//             }
//             caption={post.content}
//             createdAt={post.createdAt}
//             isLiked={post.isLiked}
//             isBookmarked={post.isBookmarked}
//             likes={post.likes}
//           />
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;






// import "./home.scss";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TopBar from "./components/TopBar";
// import Stories from "./components/Stories";
// import Post from "./components/Post";
// import Footer from "./components/Footer";
// import { fetchPosts } from "../../../store/allPostsSlice";
// import { useProfile } from "./hooks/useProfile";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { posts, page, isLoading, error } = useSelector((state) => state.allPosts);
//   const { isLoading: isProfileLoading, isError: profileError } = useProfile();

//   useEffect(() => {
//     if (posts.length === 0) {
//       dispatch(fetchPosts({ page: 1, limit: 10 }));
//     }
//   }, [dispatch, posts.length]);

//   const loadMorePosts = () => {
//     dispatch(fetchPosts({ page, limit: 10 }));
//   };

//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
//       loadMorePosts();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   if (isLoading || isProfileLoading) return <h4>Loading...</h4>;

//   if (error || profileError) return <p>Error fetching posts</p>;

//   return (
//     <div className="instagram-home">
//       <TopBar />

//       {posts.length > 0 && <Stories />}

//       <div className="post-section">
//         {posts.map((post, index) => (
//           <Post
//             key={index}
//             profilePicture={post.author?.coverImage?.url}
//             profileName={`${post.author?.firstName} ${post.author?.lastName}`}
//             postImage={
//               post.images?.[0]?.url || "https://via.placeholder.com/800x450.png"
//             }
//             caption={post.content}
//             createdAt={post.createdAt}
//             isLiked={post.isLiked}
//             isBookmarked={post.isBookmarked}
//             likes={post.likes}
//           />
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;
