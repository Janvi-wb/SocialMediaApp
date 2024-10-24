// //import { useMyPost } from "../hooks/useMyPost";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import "../../Profile/Profile.scss"

// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom/dist";

// const PostGrid = () => {
//   const posts = useSelector((store) => store.myPosts.posts);
//   //console.log(posts, "POST DATA FROM STORE");
//   //console.log(posts[0]);

//   return (
//     <>
//       <main>
//         <div className="container">
//           <div className="gallery">
//             {posts.map((post, index) => (
//               <>
//                 <Link to={`/post/${post._id}`} key={index}><div className="gallery-item" tabIndex="0" key={post._id}>
//                   <img
//                     src={post.images[0]?.url}
//                     className="gallery-image"
//                     alt="post"
//                   />

//                   <div className="gallery-item-info">
//                     <ul>
//                       <li className="gallery-item-likes">
//                         <span className="visually-hidden">Likes: </span>
//                         <i className="fas fa-heart" aria-hidden="true"></i>
//                         {" " + post.likes}
//                       </li>
//                       <li className="gallery-item-comments">
//                         <span className="visually-hidden">Comments: </span>
//                         <i className="fas fa-comment" aria-hidden="true"></i>
//                         {" " + post.comments}
//                       </li>
//                     </ul>
//                   </div>
//                 </div></Link>
//               </>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default PostGrid;


const PostGrid = () => {
  const posts = useSelector((store) => store.myPosts.posts);

  return (
    <>
      <main>
        <div className="container-postGrid">
          <div className="post-navigation">
            <Link to="/posts" className="nav-item">
              Posts
            </Link>
            <Link to="/bookmarks" className="nav-item">
              Bookmarks
            </Link>
            <Link to="/reels" className="nav-item">
              Reels
            </Link>
          </div>
          <div className="gallery">
            {posts.map((post, index) => (
              <>
                <Link to={`/post/${post._id}`} key={index}>
                  <div className="gallery-item" tabIndex="0" key={post._id}>
                    <img
                      src={post.images[0]?.url}
                      className="gallery-image"
                      alt="post"
                    />
                    <div className="gallery-item-info">
                      <ul>
                        <li className="gallery-item-likes">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                          {" " + post.likes}
                        </li>
                        <li className="gallery-item-comments">
                          <i className="fas fa-comment" aria-hidden="true"></i>
                          {" " + post.comments}
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>

                <Link to={`/post/${post._id}`} key={index}>
                  <div className="gallery-item" tabIndex="0" key={post._id}>
                    <img
                      src={post.images[0]?.url}
                      className="gallery-image"
                      alt="post"
                    />
                    <div className="gallery-item-info">
                      <ul>
                        <li className="gallery-item-likes">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                          {" " + post.likes}
                        </li>
                        <li className="gallery-item-comments">
                          <i className="fas fa-comment" aria-hidden="true"></i>
                          {" " + post.comments}
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default PostGrid;
