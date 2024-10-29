import { useState } from "react";
import { useAddPostMutation } from "../../../../store/postApiSlice";
import "./CreatePost.scss";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
  const [images, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");


  const [addPost, { isLoading }] = useAddPostMutation();

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
    formData.append("content", caption);
    console.log(tags, "TAGS");

    tags.forEach((tag) => formData.append("tags[]", tag));

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

    try {
      //await dispatch(setStatus('loading'));
      const response = await addPost(formData).unwrap();
      console.log(response, "RESPONSE OF ADDING DATA");
      alert("successfully created post!")
      navigate("/home");
      //dispatch(setPosts(response.data));
      //await dispatch(setStatus('succeeded'));
    } catch (error) {
      // await dispatch(setError(error));
      // await dispatch(setStatus('failed'));
      console.log(error, "ERROR FROM ADD POST");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="create-post-form"
    >
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
            <span className="upload-icon"><i className="fa-solid fa-image"></i>
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
              {tag} &#x2716; {" "}{" "}{" "}
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

      <button type="submit" disabled={isLoading}>
      {isLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
