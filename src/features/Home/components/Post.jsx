/* eslint-disable react/prop-types */
import "./Post.scss";
import "../../Home/home.scss";
import { getTimeDifference, truncateDescription } from "../../../../utils/functions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostActions } from "../hooks/usePostActions";

const Post = ({ post }) => {
  const { _id, author, images, content, createdAt } = post;
  const profilePicture = author?.coverImage?.url || "https://via.placeholder.com/40x40.png";
  const profileName = author?.account.username;
  const postImage = images?.[0]?.url || "https://via.placeholder.com/800x450.png";
  const [isExpanded, setIsExpanded] = useState(false);

  const { isLiked, isBookmarked, likes, handleLike, handleBookmark } = usePostActions(post);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const descriptionText = isExpanded ? content : truncateDescription(content, 10);

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
        </div>
        <div className="post-main-image">
          <img src={postImage} alt="" />
        </div>
        <div className="post-footer">
          <div className="post-footer-left">
            <i
              className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}
              style={{ color: isLiked ? "red" : "black" }}
              onClick={handleLike}
            ></i>
            <Link to={`/comments/${_id}`}>
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
                {" "} read more
              </span>
            )}
            {isExpanded && (
              <span className="read-less" onClick={toggleDescription}>
                {" "} read less
              </span>
            )}
          </p>
          <Link to={`/comments/${_id}`}>
            <p className="comments"> view all comments</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
