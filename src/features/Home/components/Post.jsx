import "./Post.scss";
import PropTypes from "prop-types";

const Post = ({ profilePicture, profileName, postImage, caption }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={profilePicture || "https://via.placeholder.com/40x40.png"}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-name">{profileName}</div>
      </div>
      <div className="post-body">
        <img
          src={postImage || "https://via.placeholder.com/800x450.png"}
          alt="Post"
          className="post-image"
        />
      </div>
      <div className="post-footer">
        <div className="post-actions">
          <span className="post-action">&#x2665;</span>
          <span className="post-action">&#128172;</span>
          <span className="post-action">&#9993;</span>
        </div>
        <div className="post-caption">
          <strong>{profileName}</strong> {caption} <span>&#128293;</span>
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
};

export default Post;
