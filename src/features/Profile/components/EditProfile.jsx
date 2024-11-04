/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./EditProfile.scss";
import {useGetProfileQuery, useUpdateProfileMutation } from "../../../../store/profileApiSlice"
import { useEffect, useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const { data: userProfile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        firstName: userProfile?.data?.firstName,
        lastName: userProfile?.data?.lastName,
        bio: userProfile?.data?.bio,
        phoneNumber: userProfile?.data?.phoneNumber,
      });
    }
  }, [userProfile]);

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
        <p>Getting profile...</p>
      ) : (
        <form onSubmit={handleSubmit}>
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
              value={profileData?.lastName || " "}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <p>Bio</p>
            <textarea
              value={profileData?.bio || " "}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <p>Phone Number</p>
            <input
              type="number"
              value={profileData?.phoneNumber || " "}
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
