import { useLocation, useNavigate } from "react-router-dom";
import { useGetCommentsQuery, useAddCommentMutation } from "../../../store/commentApiSlice";
import CommentBox from "./CommentBox";
import { useRef, useState } from "react";
import './Comment.scss';
import ShimmerComment from "./ShimmerComment";

const Comment = ()=>{
  const [newCommentContent, setNewCommentContent] = useState("");
  const navigate = useNavigate();
    const CommentText = useRef();
    const postId = useLocation().pathname.split("/")[2];
    console.log(postId, "POST ID");

    const {data , isCommentsLoading} = useGetCommentsQuery({postId});
    const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
    //const [addComment] = useAddCommentMutation();
    console.log(data);

    const handlePostComment = async()=>{
      const content = CommentText.current.value;

      if (!content.trim()) {
        console.log("Empty comment!");
        return;
      }
  
      try {
        setNewCommentContent(content);
        const res = await addComment({ postId, content }); 
        console.log(res, "COMMENT ADDED!");
        CommentText.current.value = ""; 
        setNewCommentContent("");
      } catch (err) {
        console.error(err);
      }
    };
  
    if (isCommentsLoading) return <p>Loading comments...</p>;

    return (
        <div className="comment-page">
          <header className="header">
          <button onClick={() => navigate(-1)} className="back-button">Back</button>
            <h2>Comments</h2>
          </header>
    
          <div className="comments-section">
            {data?.data?.comments?.map((comment) => (
              <CommentBox key={comment._id} comment={comment} />
            ))}
            {isAddingComment && <ShimmerComment content={newCommentContent} />}
          </div>
    
          <div className="add-comment">
            <textarea type="text" placeholder="Add a comment..." ref={CommentText} />
            <button onClick={handlePostComment}>Post</button>
          </div>
        </div>
      );
}

export default Comment;
