//import { useMyPost } from "../hooks/useMyPost";

import { useSelector } from "react-redux";

const PostGrid = () => {
  const posts = useSelector((store) => store.myPosts.posts);
  console.log(posts, "POST DATA FROM STORE");
  console.log(posts[0]);

  return (
    <>
      <main>
        <div className="container">
          <div className="gallery">
            {posts.map((post) => (
              <>
                <div className="gallery-item" tabIndex="0" key={post._id}>
                  <img
                    src={post.images[2]?.url} // Use optional chaining to prevent errors if images are missing
                    className="gallery-image"
                    alt="post"
                  />

                  <div className="gallery-item-info">
                    <ul>
                      <li className="gallery-item-likes">
                        <span className="visually-hidden">Likes:</span>
                        <i className="fas fa-heart" aria-hidden="true"></i>
                        {post.likes}
                      </li>
                      <li className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>
                        <i className="fas fa-comment" aria-hidden="true"></i>
                        {post.comments}
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default PostGrid;
