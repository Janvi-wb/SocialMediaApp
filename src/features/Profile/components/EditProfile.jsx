/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./EditProfile.scss";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../../store/profileApiSlice";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [profileData, setProfileData] = useState({});
  //const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user?.data?.firstName,
        lastName: user?.data?.lastName,
        bio: user?.data?.bio,
        phoneNumber: user?.data?.phoneNumber,
      });
      //setPreview(user?.data?.coverImage?.url);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = profileData;

    try {
      await updateProfile(formData).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error("Failed :", error);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-title">Edit Profile</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* <div className="profile-picture-wrapper">
            <img src={preview || DEFAULT_PHOTO_URL} alt="Profile" />
          </div> */}
          <div className="input-group">
            <p>First Name</p>
            <input
              type="text"
              value={profileData?.firstName || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <p>Last Name</p>
            <input
              type="text"
              value={profileData?.lastName || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <p>Bio</p>
            <textarea
              value={profileData?.bio || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <p>Phone Number</p>
            <input
              type="number"
              value={profileData?.phoneNumber || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, phoneNumber: e.target.value })
              }
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={isUpdating} className="save-btn">
              {isUpdating ? "Updating..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
