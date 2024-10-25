import { useLocation, useNavigate } from "react-router-dom/dist";
import TopBar from "../../Home/components/TopBar";
import { useGetPostByIdQuery } from "../../../../store/postApiSlice";
import Footer from "../../Home/components/Footer";
import Post from "../../Home/components/Post";
import "./PostModal.scss"

const PostModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  console.log(postId);

  const { data: postData } = useGetPostByIdQuery(postId);
  console.log(postData);


  const closeModal = () => {
    navigate(-1);
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

