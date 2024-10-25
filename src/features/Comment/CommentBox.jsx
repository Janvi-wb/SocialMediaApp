/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { useAddCommentLikeMutation } from "../../../store/commentApiSlice";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CommentBox = ({ comment }) => {
  const [addCommentLike] =
    useAddCommentLikeMutation();
  const handleCommentLike = async () => {
    try {
      console.log(comment._id);
      const res = await addCommentLike({ commentId: comment._id });
      console.log(res);
    } catch (err) {
      console.error("Failed to like comment:", err);
    }
  };

  const [commentContent, setCommentContent] = useState(
    comment.content.length > 50
      ? `${comment.content.substring(0, 100)}... more`
      : comment.content
  );
  return (
    <div className="comment">
      <img
        className="avatar"
        src={comment?.author?.account?.avatar?.url}
        alt={comment?.author?.account?.username}
      />

      <div className="comment-content">
        <div className="comment-header">
          <p>
            <span className="username">
              <Link to={`/profile/${comment?.author?.account?.username}`}>
                {comment?.author?.account?.username}
              </Link>
            </span>{" "}
            <span
              onClick={() => setCommentContent(comment.content)}
              className="text"
            >
              {commentContent}{" "}
            </span>
          </p>
        </div>

        <div className="comment-actions">
          <span className="time">{moment(comment?.createdAt).fromNow()}</span>
          <span className="likes">{comment.likes} likes</span>
        </div>
      </div>

      <div className="comment-like">
        <button className="like-button" onClick={handleCommentLike}>
          <i
            className={`fa-${comment.isLiked ? "solid" : "regular"} fa-heart`}
            style={{ color: comment.isLiked ? "red" : "black" }}
          ></i>
        </button>
      </div>
    </div>
  );
};
export default CommentBox;
