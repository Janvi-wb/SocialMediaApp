import { useState } from "react";
import { useAddPostMutation } from "../../../../store/postApiSlice";
import "./CreatePost.scss";
import { useNavigate } from "react-router-dom";
import { setStatus, updateMyPosts } from "../../../../store/postSlice";
import { setError } from "../../../../store/profileSlice";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../../../store/allPostsSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const navigate = useNavigate();
  const [images, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const [addPost, { isLoading }] = useAddPostMutation();
  const dispatch = useDispatch();

  // Handle tag input on pressing 'Enter'
  const handleTagInput = (e) => {
    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, inputTag.trim()]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(images, "IMAGE");

    formData.append("images", images);
    console.log(caption, "CAPTION");
    formData.append("content", caption); // mistake (caption -> "content")
    console.log(tags, "TAGS");

    tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await dispatch(setStatus("loading"));
      const response = await addPost(formData).unwrap();
      console.log(response, "RESPONSE OF ADDING DATA");
      const newPost = response.data;
      console.log(newPost, "NEW POST");
      dispatch(addNewPost(newPost));
      toast.success("Post is created!")

      navigate("/home");
      dispatch(updateMyPosts(response.data));
      await dispatch(setStatus("succeeded"));
    } catch (error) {
      await dispatch(setError(error));
      await dispatch(setStatus("failed"));
      //   console.log(error, "ERROR FROM ADD POST");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="create-post-form"
    >
        <h1 className="new-post-heading">New Post</h1>
      <div
        className="image-upload-box"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <span
              className="remove-image"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              &#x2716;
            </span>
          </>
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">
              <i className="fa-solid fa-image"></i>
            </span>
            <span>Upload Image</span>
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        />
      </div>

      <div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              onClick={() => handleRemoveTag(index)}
            >
              {tag} &#x2716;{" "}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="Add a tag and press Enter"
        />
      </div>

      <div className="button-group">
        <button
          type="submit"
          disabled={isLoading}
          className={`post-button ${isLoading ? "disabled" : ""}`}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
        <button
          onClick={() => navigate(-1)}
          type="button"
          disabled={isLoading}
          className={`cancel-button ${isLoading ? "disabled" : ""}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
