import { useNavigate } from "react-router-dom";
import "./EditProfile.scss";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../../store/profileApiSlice";
import { useEffect, useState } from "react";

const EditProfile = () => {
    const navigate = useNavigate();
    const {data: user, isLoading} = useGetProfileQuery();
    const [updateUserProfile , {isLoading: isUpdating}] = useUpdateProfileMutation();
    
    const [name, setName] = useState(null);
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (user) {
            setName({firstName : user?.data?.firstName , lastName : user?.data?.lastName});
            setBio(user?.data?.bio);
            setPreview(user?.data?.account?.avatar?.url); // Show existing profile picture
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setPreview(URL.createObjectURL(file)); // Show preview of new image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name , bio, profilePicture);
        const formData = {
            firstName: name?.firstName,
            lastName: name?.lastName,
            bio,
        }
        //console.log(formData);

        try {
            await updateUserProfile(formData).unwrap();
            alert("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <div className="edit-profile-page">
            <h1>Edit Profile</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="profile-picture-section">
                        <img src={preview || "/default-avatar.png"} alt="Profile" />
                        <label htmlFor="file-upload">Change Profile Picture</label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={name?.firstName}
                            onChange={(e) => setName({firstName : e.target.value, lastName : name?.lastName})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={name?.lastName}
                            onChange={(e) => setName({firstName : name?.firstName, lastName : e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Save"}
                    </button>
                    <button type="button" onClick={() => navigate("/profile")}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditProfile
