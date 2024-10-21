// // // import React from 'react';
// // import "./home.scss";
// // import { useProfile } from "./hooks/useProfile";

// // const Home = () => {
// //   const {profile, isLoading, error} = useProfile();
// //   console.log(profile?.account?.avatar?.url, "AVATAR");

// //   if(isLoading) return <h4>Loading...</h4>
// //   if(error) return <p>Error fetching profile: {error.message}</p>

// //   return (
// //     <div className="instagram-home">
// //       {/* Top Bar */}
// //       <div className="top-bar">
// //         <input type="text" placeholder="Search" className="search-bar" />
// //         <div className="top-icons">
// //           <span className="top-icon">&#x2665;</span>
// //           <span className="top-icon">&#128276;</span>
// //         </div>
// //       </div>

// //       {/* Stories */}
// //       <div className="stories">
// //         <div className="story">
// //           <img
// //             src={profile?.account?.avatar?.url || 'https://via.placeholder.com/40x40.png'}
// //             alt={"Story"}
// //             className="story-image"
// //           />
// //         </div>
// //       </div>

// //       {/* Post */}
// //       <div className="post">
// //         <div className="post-header">
// //           <img
// //             src="https://via.placeholder.com/40x40.png"
// //             alt="Profile"
// //             className="profile-picture"
// //           />
// //           <div className="profile-name">googleindia</div>
// //         </div>
// //         <div className="post-body">
// //           <img
// //             src="https://via.placeholder.com/800x450.png"
// //             alt="Post"
// //             className="post-image"
// //           />
// //         </div>
// //         <div className="post-footer">
// //           <div className="post-actions">
// //             <span className="post-action">&#x2665;</span>
// //             <span className="post-action">&#128172;</span>
// //             <span className="post-action">&#9993;</span>
// //           </div>
// //           <div className="post-caption">
// //             <strong>googleindia</strong> Picking a career <span>&#128293;</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;

// import "./home.scss";
// import { useProfile } from "./hooks/useProfile";
// import TopBar from "./components/TopBar";
// import Stories from "./components/Stories";
// import Post from "./components/Post";
// import Footer from "./components/Footer";

// const Home = () => {
//   const { profile, isLoading, error } = useProfile();
//   console.log(profile?.account?.avatar?.url, "AVATAR");

//   if (isLoading) return <h4>Loading...</h4>;
//   if (error) return <p>Error fetching profile: {error.message}</p>;

//   return (
//     <div className="instagram-home">
//       {/* Top Bar */}
//       <TopBar />

//       {/* Stories */}
//       <Stories avatarUrl={profile?.account?.avatar?.url} />

//       {/* Post */}
//       <Post
//         profilePicture={profile?.account?.avatar?.url}
//         profileName="googleindia"
//         postImage="https://via.placeholder.com/800x450.png"
//         caption="Picking a career"
//       />

//       {/* Footer */}
//       <Footer profilePicture={profile?.account?.avatar?.url} />
//     </div>
//   );
// };

// export default Home;

import "./home.scss";
import { useGetAllPostsQuery } from "../../../store/postApiSlice";
import TopBar from "./components/TopBar";
import Stories from "./components/Stories";
import Post from "./components/Post";
import Footer from "./components/Footer";

const Home = () => {
  const { data: allPost, isLoading, error } = useGetAllPostsQuery();

  if (isLoading) return <h4>Loading...</h4>;

  if (error) return <p>Error fetching posts</p>;

  const posts = allPost?.data?.posts || [];

  console.log(posts[0].author?.account?.avatar?.url);

  return (
    <div className="instagram-home">
      <TopBar />

      {posts.length > 0 && (
        <Stories avatarUrl={posts[0]?.author?.coverImage?.url} />
      )}

      <div className="post-section">
        {posts.map((post) => (
          <Post
            key={post._id}
            profilePicture={post.author?.coverImage?.url}
            profileName={`${post.author?.firstName} ${post.author?.lastName}`}
            postImage={
              post.images?.[0]?.url || "https://via.placeholder.com/800x450.png"
            }
            caption={post.content}
            createdAt={post.createdAt}
            isLiked={post.isLiked}
            isBookmarked={post.isBookmarked}
            likes={post.likes}
          />
        ))}
      </div>

      <Footer profilePicture={posts[0]?.author?.coverImage?.url} />
    </div>
  );
};

export default Home;
