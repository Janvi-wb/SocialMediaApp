// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CreatePost.scss";
// import { useAddPostMutation } from "../../../../store/postApiSlice";

// const CreatePost = () => {
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [tags, setTags] = useState([]);
//     const [tagInput, setTagInput] = useState("");
//     const [caption, setCaption] = useState("");
//     const [createPost, { isLoading }] = useAddPostMutation();
//     const navigate = useNavigate();

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const url = URL.createObjectURL(file);
//             setImage(file);
//             setPreview(url);
//         }
//     };

//     const handleTagInputChange = (e) => {
//         setTagInput(e.target.value);
//     };

//     const handleTagKeyDown = (e) => {
//         if (e.key === "Enter" && tagInput.trim()) {
//             setTags((prevTags) => [...prevTags, tagInput.trim()]);
//             setTagInput("");
//         }
//     };

//     const removeTag = (index) => {
//         setTags((prevTags) => prevTags.filter((tag, i) => i !== index));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!image || !caption) {
//             console.log("All fields are required");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("image", image);
//         formData.append("caption", caption);
//        // Log the FormData contents
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//   }

//         try {
//             await createPost(formData).unwrap();
//             console.log("Post created!");
//             navigate("/home");
//         } catch (err) {
//             console.error("FAILED POST CREATION", err);
//         }
//     };

//     return (
//         <div className="add-post-page">
//             <div className="modal-content">
//                 <button onClick={() => navigate(-1)} className="close-button">x</button>
//                 <div className="header">Create Post</div>
//                 <div className="image-preview">
//                     {preview ? (
//                         <>
//                             <button className="remove-image-button" onClick={() => setPreview(null)}>
//                                 <img src="https://pic.onlinewebfonts.com/svg/img_577400.svg" className="remove-image" />
//                             </button>
//                             <img src={preview} alt="Preview" />
//                         </>
//                     ) : (
//                         <label htmlFor="file-upload">
//                             <img src="https://www.svgrepo.com/show/379235/photo-add.svg" className="add-photo-icon" />
//                             Upload Photo
//                         </label>
//                     )}
//                 </div>
//                 <form className="form" onSubmit={handleSubmit}>
//                     <input
//                         type="file"
//                         id="file-upload"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                     />
//                     <input
//                         type="text"
//                         placeholder="caption"
//                         value={caption}
//                         onChange={(e) => setCaption(e.target.value)}
//                     />

//                     {/* Tags Input */}
//                     <div className="tags-container">
//                         {tags.map((tag, index) => (
//                             <div key={index} className="tag-chip">
//                                 {tag}
//                                 <button onClick={() => removeTag(index)}>x</button>
//                             </div>
//                         ))}
//                         <input
//                             type="text"
//                             placeholder="Add a tag (press Enter)"
//                             value={tagInput}
//                             onChange={handleTagInputChange}
//                             onKeyDown={handleTagKeyDown}
//                         />
//                     </div>

//                     <button type="submit" disabled={isLoading}>
//                         {!isLoading ? "Post" : "Posting..."}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreatePost;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.scss";
import { useAddPostMutation } from "../../../../store/postApiSlice";

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [caption, setCaption] = useState("");
    const [addPost, { isLoading }] = useAddPostMutation();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(file);
            setPreview(url);
        }
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            setTags((prevTags) => [...prevTags, tagInput.trim()]);
            setTagInput(""); // Clear input after adding the tag
            e.preventDefault(); // Prevent default Enter key behavior
        }
    };

    const removeTag = (index) => {
        setTags((prevTags) => prevTags.filter((tag, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !caption) {
            console.log("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);
        tags.forEach((tag, i) => {
         formData.append(`tag[${i}] : `, tag )
     })

        try {
            const response = await addPost(formData).unwrap();
            console.log("Post created!", response);
            navigate("/home");
        } catch (err) {
            console.error("FAILED POST CREATION", err);
        }
    };

    return (
        <div className="add-post-page">
            <div className="modal-content">
                <button onClick={() => navigate(-1)} className="close-button">x</button>
                <div className="header">Create Post</div>
                <div className="image-preview">
                    {preview ? (
                        <>
                            <button className="remove-image-button" onClick={() => setPreview(null)}>
                                <img src="https://pic.onlinewebfonts.com/svg/img_577400.svg" className="remove-image" alt="Remove" />
                            </button>
                            <img src={preview} alt="Preview" />
                        </>
                    ) : (
                        <label htmlFor="file-upload" className="upload-label">
                            <img src="https://www.svgrepo.com/show/379235/photo-add.svg" className="add-photo-icon" alt="Upload" />
                            Upload Photo
                        </label>
                    )}
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <input
                        type="text"
                        placeholder="Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    {/* Tags Input */}
                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <div key={index} className="tag-chip">
                                {tag}
                                <button onClick={() => removeTag(index)}>x</button>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="Add a tag (press Enter)"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagKeyDown}
                        />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {!isLoading ? "Post" : "Posting..."}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
