import { useLocation } from "react-router-dom";
import { useGetCommentsQuery, useAddCommentMutation } from "../../../store/commentApiSlice";
import CommentBox from "./CommentBox";
import { useRef } from "react";
import './Comment.scss';

const Comment = ()=>{
    const postId = useLocation().pathname.split("/")[2];
    console.log(postId);
    const CommentText = useRef();

    const {data , isLoading} = useGetCommentsQuery({postId});
    //const [addComment, { isLoading }] = useAddCommentMutation();
    const [addComment] = useAddCommentMutation();
    console.log(data);

    const handlePostComment = async()=>{
      const content = CommentText.current.value;

      if (!content.trim()) {
        console.log("Empty comment!");
        return;
      }
  
      try {
        const res = await addComment({ postId, content }); 
        console.log("Comment posted:", res);
        CommentText.current.value = ""; 
      } catch (err) {
        console.error("Failed to post comment:", err);
      }
    };
  
    if (isLoading) return <p>Loading comments...</p>;

    return (
        <div className="comment-page">
          <header className="header">
            <h2>Comments</h2>
          </header>
    
          <div className="comments-section">
            {data?.data?.comments?.map((comment) => (
              <CommentBox key={comment._id} comment={comment} />
            ))}
          </div>
    
          <div className="add-comment">
            <textarea type="text" placeholder="Add a comment..." ref={CommentText} />
            <button onClick={handlePostComment}>Post</button>
          </div>
        </div>
      );
}

export default Comment;
