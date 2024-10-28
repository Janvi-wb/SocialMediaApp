/* eslint-disable react/prop-types */
import "./Post.scss";
import "../../Home/home.scss";
import PropTypes from "prop-types";
import {
  getTimeDifference,
  truncateDescription,
} from "../../../../utils/functions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useBookmarkPostMutation,
  useLikePostMutation,
} from "../../../../store/postApiSlice";
import { addAllPosts } from "../../../../store/allPostsSlice";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  //console.log(post, "POST POST");
  const {
    _id,
    author,
    images,
    content,
    createdAt,
    isLiked,
    isBookmarked,
    likes,
  } = post;

  const [likePost] = useLikePostMutation();
  const [bookmarkPost] = useBookmarkPostMutation();
  const dispatch = useDispatch();

  const profilePicture =
    author?.coverImage?.url || "https://via.placeholder.com/40x40.png";
  const profileName = `${author?.account.username}`;
  const postImage =
    images?.[0]?.url || "https://via.placeholder.com/800x450.png";
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  // Access allPosts from Redux store
  const allPosts = useSelector((state) => state.allPosts.allPosts);

  const handleLike = async () => {
    console.log("LIKED/UNLIKED");
    try {
      const response = await likePost(_id).unwrap();
      console.log(response, "RESPONSE");
      const updatedPosts = updatePostInStore(
        _id,
        {
          isLiked: response.data.isLiked,
          likes: response.data.isLiked ? likes + 1 : likes - 1,
        },
        allPosts
      );
      console.log(updatedPosts, "UPDATED DATA");
      dispatch(addAllPosts(updatedPosts));
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await bookmarkPost(_id).unwrap();
      console.log(response, "BOOKMARK");
      const updatedPosts = updatePostInStore(
        _id,
        {
          isBookmarked: response.data.isBookmarked,
        },
        allPosts
      );
      dispatch(addAllPosts(updatedPosts));
    } catch (error) {
      console.error("Error bookmarking post: ", error);
    }
  };

  const updatePostInStore = (postId, updatedData, posts) => {
    return posts.map((post) =>
      post._id === postId ? { ...post, ...updatedData } : post
    );
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const descriptionText = isExpanded
    ? content
    : truncateDescription(content, 10);

  return (
    <div className="post-area">
      <div className="post-main">
        <div className="post-header">
          <div className="post-left-header">
            <div className="post-image">
              <img src={profilePicture} alt="" />
            </div>
            <Link to={`/profile/${profileName}`}>
              <p className="post-username">{profileName}</p>
            </Link>
            <span className="one-day">. {getTimeDifference(createdAt)}</span>
          </div>
          <img
            className="dots"
            src="https://clipground.com/images/three-dots-png-1.png"
            alt="menu"
          />
        </div>
        <div className="post-main-image">
          <img src={postImage} alt="" />
        </div>
        <div className="post-fotter">
          <div className="post-fotter-left">
            <i
              className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}
              style={{ color: isLiked ? "red" : "black" }}
              onClick={handleLike}
            ></i>
            <Link to={`/comments/${post._id}`}>
              <i className="fa-regular fa-message"></i>
            </Link>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
          <i
            className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark`}
            style={{ color: isBookmarked ? "black" : "grey" }}
            onClick={handleBookmark}
          ></i>
        </div>
        <div className="post-description">
          <p className="post-liked">
            <strong>{likes} Likes</strong>
          </p>
          <p className="title">
            <strong>{profileName}</strong> {descriptionText}
            {content.split(" ").length > 10 && !isExpanded && (
              <span className="read-more" onClick={toggleDescription}>
                {" "}
                read more
              </span>
            )}
            {isExpanded && (
              <span className="read-less" onClick={toggleDescription}>
                {" "}
                read less
              </span>
            )}
          </p>
          <Link to={`/comments/${post._id}`}>
            <p className="comments"> view all comments</p>
          </Link>
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.object,
    images: PropTypes.array,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    isLiked: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    likes: PropTypes.number,
  }).isRequired,
};

export default Post;

{
  /* <div className="post-header">
        <img
          src={profilePicture || "https://via.placeholder.com/40x40.png"}
          alt="Profile"
          className="profile-picture"
        />
        <span className="profile-name">{profileName}</span>
      </div>
      <div className="post-body">
        <img
          src={postImage || "https://via.placeholder.com/800x450.png"}
          alt="Post"
          className="post-image"
        />
      </div> */
}
{
  /* <div className="post-footer">
        <div className="post-actions">
          <span className="post-action">&#x2665;</span>
          <span className="post-action">&#128172;</span>
          <span className="post-action">&#9993;</span>
        </div>
        <div className="post-caption">
          <strong>{profileName}</strong> {caption}
        </div>
      </div> */
}
