import { useNavigate } from "react-router-dom";
import "./EditProfile.scss";
import {
  useGetProfileQuery,
//   useUpdateCoverPhotoMutation,
  useUpdateProfileMutation,
} from "../../../../store/profileApiSlice";
import { useEffect, useState } from "react";
//import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  //const [updateCoverPhoto, { isLoading: isCoverPhotoUpdating }] = useUpdateCoverPhotoMutation();

  const [name, setName] = useState(null);
  const [bio, setBio] = useState("");
  //const [profilePicture, setProfilePicture] = useState(null);
  //const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setName({
        firstName: user?.data?.firstName,
        lastName: user?.data?.lastName,
      });
      setBio(user?.data?.bio);
    //   setPreview(
    //     DEFAULT_PHOTO_URL ||
    //       user?.data?.account?.avatar?.url ||
    //       DEFAULT_PHOTO_URL
    //   ); // Show existing profile picture
    }
  }, [user]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
      //setProfilePicture(file);
      //setPreview(URL.createObjectURL(file));
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("firstName", name?.firstName);
    // formData.append("lastName", name?.lastName);
    // formData.append("bio", bio);

    // const formData1 = new FormData();
    // formData1.append("coverImage", profilePicture);
    const formData = {
        bio: bio,
        firstName: name?.firstName,
        lastName: name?.lastName
    }

    console.log(formData, "FORM DATA");

    //const formDataImage = { coverImage: profilePicture}

    try {
      const res = await updateProfile(formData).unwrap();
      //const res1 = await updateCoverPhoto(formDataImage).unwrap();
      console.log(res, "RES 1");
      //console.log(res1, "RES 2");
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      // Log full error details for troubleshooting
      console.error("Failed to update profile:", error);
      if (error?.status === "PARSING_ERROR") {
        console.error("Response data:", error?.data);
        alert("Failed to parse response. Please check the API or try again.");
      } else {
        alert("An error occurred while updating your profile.");
      }
    }
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <div className="profile-picture-section">
            <img src={preview || "/default-avatar.png"} alt="Profile" />
            <p className="label" htmlFor="file-upload">
              Change Profile Picture
            </p>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageChange}
              // style={{ display: "none" }}
            />
          </div> */}
          <div className="form-group">
            <p className="label">First Name</p>
            <input
              type="text"
              value={name?.firstName}
              onChange={(e) =>
                setName({ firstName: e.target.value, lastName: name?.lastName })
              }
            />
          </div>
          <div className="form-group">
            <p className="label">Last Name</p>
            <input
              type="text"
              value={name?.lastName}
              onChange={(e) =>
                setName({
                  firstName: name?.firstName,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <p className="label">Bio</p>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <button type="submit" disabled={isUpdating}>
            {isUpdating  ? "Updating..." : "Save"}
          </button>
          <button type="button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
