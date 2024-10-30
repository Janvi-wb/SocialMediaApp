// import { useState } from "react";
// import { useGetPostsByTagQuery } from "../../../../store/postApiSlice";
// import Post from "./Post";
// import "./Search.scss";

// const Search = () => {
//   const [tag, setTag] = useState("");
//   const {
//     data: posts,
//     isLoading,
//     error,
//   } = useGetPostsByTagQuery(tag, {
//     skip: !tag,
//   });

//   console.log(posts?.data?.posts);
//   console.log(posts?.data?.posts.length);

//   const handleSearch = () => {
//     if (tag.trim()) {
//       setTag(tag.trim());
//     }
//   };

//   return (
//     <div className="search-page">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search posts by tag"
//           value={tag}
//           onChange={(e) => setTag(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//           <i className="search-icon">
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </i>
//         </button>
//       </div>

//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error fetching posts</p>}
//       <div className="posts-list">
//         {posts?.data?.posts.length !== 0 ? (
//           posts?.data?.posts.map((post) => <Post key={post.id} post={post} />)
//         ) : (
//           <p>No posts with this tag</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;


import { useState } from "react";
import { useGetPostsByTagQuery } from "../../../../store/postApiSlice";
import Post from "./Post";
import "./Search.scss";

const Search = () => {
  const [searchTag, setSearchTag] = useState(""); // State for the input box
  const [tag, setTag] = useState(""); // State for triggering the API call
  const [hasSearched, setHasSearched] = useState(false); // Track if search has been attempted
  const { data: posts, isLoading, error } = useGetPostsByTagQuery(tag, {
    skip: !tag,
  });

  const handleSearch = () => {
    if (searchTag.trim()) {
      setTag(searchTag.trim()); // Set the tag for API query when button is clicked
      setHasSearched(true); // Set hasSearched to true when a search is performed
    }
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts by tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)} // Update input value
        />
        <button onClick={handleSearch}>
          <i className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </i>
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching posts</p>}
      <div className="posts-list">
        {hasSearched && posts?.data?.posts?.length === 0 && (
          <p>No posts with this tag</p>
        )}
        {posts?.data?.posts?.length > 0 &&
          posts.data.posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
