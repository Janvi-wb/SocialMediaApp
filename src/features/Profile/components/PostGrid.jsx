/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// //import { useMyPost } from "../hooks/useMyPost";

//import { useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import "../../Profile/Profile.scss";
//import { useMyPost } from "../hooks/useMyPost";

const PostGrid = ({ posts }) => {
  //const posts = useSelector((store) => store.myPosts.posts);
  // if (!posts) {
  //   const { posts } = useMyPost();
  //   console.log(posts);
  // }

  return (
    <>
      <main>
        <div className="container-postGrid">
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
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default PostGrid;
