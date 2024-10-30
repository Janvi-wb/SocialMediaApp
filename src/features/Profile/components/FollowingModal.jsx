import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFollowingUserQuery } from "../../../../store/profileApiSlice";
import useFollowUnfollow from "../../Home/hooks/useFollowUnfollow";
import "./Follow.scss";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";
import { useEffect, useState } from "react";

const FollowingModal = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.user?.username);
  
  const { data, isLoading, refetch } = useFollowingUserQuery(username);
  const { ToggleFollow } = useFollowUnfollow();

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (data?.data?.following) {
      setFollowing(data.data.following);
    }
  }, [data]);

  const handleUnFollow = async (followingId) => {
    setFollowing((prevFollowing) =>
        prevFollowing.map((following) =>
            following._id === followingId
            ? { ...following, isFollowing: !following.isFollowing }
            : following
        )
      );
  
      const response = await ToggleFollow(followingId);
      if (response.success) {
        refetch();
      } else {
        setFollowing((prevFollowing) =>
            prevFollowing.map((following) =>
                following._id === followingId
              ? { ...following, isFollowing: !following.isFollowing }
              : following
          )
        );
      }
  };

  if (isLoading) return <div>Following...</div>;

  return (
    <div className="followers-modal">
      <div className="modal-header">
        <h2>Following</h2>
        <button className="close-btn" onClick={() => navigate(-1)}>
          &times;
        </button>
      </div>
      <div className="followers-list">
        {data?.data?.following?.length === 0 && (
          <p className="no-followers">No Following yet</p>
        )}

        {following.map((following) => (
          <div key={following._id} className="follower-card">
            <div className="follower-info">
              <img src={DEFAULT_PHOTO_URL || following.avatar.url} alt={following.name} />
              <div className="follower-details">
                <Link to={`/profile/${following.username}`}>
                  <h4>{following.username}</h4>
                </Link>
                <p>
                  {following.profile.firstName} {following.profile.lastName}
                </p>
              </div>
            </div>
            {currentUser !== following.username && (
              <button
                className="follow-btn"
                onClick={() =>
                  handleUnFollow(following._id, following.username)
                }
              >
                {following.isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingModal;
