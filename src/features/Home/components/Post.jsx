import "./Post.scss";
import "../../Home/home.scss";
import PropTypes from "prop-types";
import {
  getTimeDifference,
  truncateDescription,
} from "../../../../utils/functions";
import { useState } from "react";

const Post = ({
  profilePicture,
  profileName,
  postImage,
  caption,
  createdAt,
  isLiked,
  isBookmarked,
  likes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  // Toggle between full description and truncated description
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };


  // Determine which description to show
  const descriptionText = isExpanded
    ? caption
    : truncateDescription(caption, 10);

  return (
    <div className="post-area">
      {/*  */}
      <div className="post-main">
        <div className="post-header">
          <div className="post-left-header">
            <div className="post-image">
              <img
                src={profilePicture || "https://via.placeholder.com/40x40.png"}
                alt=""
              />
            </div>
            <p className="post-username">{profileName}</p>
            <span className="one-day">
              {" "}
              . {getTimeDifference(createdAt)}{" "}
            </span>{" "}
          </div>
          <img className="dots" src="https://clipground.com/images/three-dots-png-1.png" />
        </div>
        <div className="post-main-image">
          <img
            src={postImage || "https://via.placeholder.com/800x450.png"}
            alt=""
          />
        </div>
        <div className="post-fotter">
          <div className="post-fotter-left">
          <i
              className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}
              style={{ color: isLiked ? "red" : "black" }}
            ></i>
            <i className="fa-regular fa-message"></i>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
          <i
            className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark`}
            style={{ color: isBookmarked ? "black" : "grey" }}
          ></i>
          {/* <i className="fa-solid fa-bookmark" /> */}
        </div>
        <div className="post-description">
          <p className="post-liked"><strong>{likes} Likes</strong></p>
          <p className="title">
            <strong>{profileName}</strong> {descriptionText}
            {caption.split(" ").length > 10 && !isExpanded && (
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
          <p className="comments"> view all comments</p>
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
  profilePicture: PropTypes.string,
  profileName: PropTypes.string,
  postImage: PropTypes.string,
  caption: PropTypes.string,
  createdAt: PropTypes.string,
  isLiked: PropTypes.bool,
  isBookmarked: PropTypes.bool,
  likes: PropTypes.number,
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
