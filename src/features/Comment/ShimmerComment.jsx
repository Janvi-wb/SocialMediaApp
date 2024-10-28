import './ShimmerComment.scss';

// eslint-disable-next-line react/prop-types
const ShimmerComment = ({ content }) => {
  return (
    <div className="shimmer-comment">
      <div className="avatar shimmer-bg"></div>
      <div className="comment-content">
        <div className="username shimmer-text">Username</div>
        <div className="text shimmer-text">{content}</div>
        <div className="comment-actions">
          <span className="time shimmer-text">Just now</span>
          <span className="likes shimmer-text">0 likes</span>
        </div>
      </div>
      <div className="comment-like">
        <i className="fa-regular fa-heart shimmer-text"></i>
      </div>
    </div>
  );
};

export default ShimmerComment;
