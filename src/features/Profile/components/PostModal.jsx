import { useLocation, useNavigate } from "react-router-dom/dist";
import TopBar from "../../Home/components/TopBar";
import {
  useGetPostByIdQuery,
  useDeleteMyPostMutation,
} from "../../../../store/postApiSlice";
import Footer from "../../Home/components/Footer";
import Post from "../../Home/components/Post";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromMyPost } from "../../../../store/postSlice";
import "./PostModal.scss";
import { toast } from "react-toastify";

const PostModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postId = location.pathname.split("/")[2];
  const user = useSelector((store) => store?.user?.user);

  const { data: postData } = useGetPostByIdQuery(postId);
  console.log(postData, "POST DATA");
  const [deleteMyPost] = useDeleteMyPostMutation();

  const closeModal = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await deleteMyPost(postId).unwrap();
      dispatch(deleteFromMyPost(postId));
      toast.success("Post is Deleted!");
      navigate(-1);
    } catch (e) {
      toast.error("Failed to delete post", e?.data?.message)
    }
  };

  if (!postData) return null;

  return (
    <div>
      <TopBar />
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          {user._id === postData.data?.author?.owner && (
            <i
              onClick={handleDelete}
              className="fa fa-trash delete-button"
              aria-hidden="true"
            ></i>
          )}
          <div className="post-details">
            <Post post={postData?.data} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostModal;
