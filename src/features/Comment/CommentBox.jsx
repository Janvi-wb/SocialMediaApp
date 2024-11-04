/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import {
  useAddCommentLikeMutation,
  useDeleteCommentMutation,
} from "../../../store/commentApiSlice";
import { Link } from "react-router-dom";
import { DEFAULT_PHOTO_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const CommentBox = ({ comment }) => {
  const [addCommentLike] = useAddCommentLikeMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const user = useSelector((state) => state.user?.user);
  const handleCommentLike = async () => {
    try {
      //console.log(comment._id);
      await addCommentLike({ commentId: comment._id });
      //console.log(res);
    } catch (err) {
      console.error("FAILED TO LIKE : ", err);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment({ commentId: comment._id });
      console.log(res);
    } catch (error) {
      console.error("Failed to Delete comment :", error);
    }
  };

  const [commentContent, setCommentContent] = useState(
    comment.content.length > 50
      ? `${comment.content.substring(0, 100)}...more`
      : comment.content
  );
  return (
    <div className="comment">
      <img
        className="avatar"
        src={DEFAULT_PHOTO_URL || comment?.author?.account?.avatar?.url}
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
          {user?._id === comment?.author?.account?._id && (
            <button className="delete-btn" onClick={handleDeleteComment}>
              <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
          )}
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
