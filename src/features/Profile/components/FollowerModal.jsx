import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFollowersUserQuery } from "../../../../store/profileApiSlice";
import useFollowUnfollow from "../../Home/hooks/useFollowUnfollow";
import "./Follow.scss";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";

const FollowerModal = () => {
  const { username } = useParams(); // Get the userId from the route
  const currentUser = useSelector((state) => state.user?.user?.username);
  const { data } = useFollowersUserQuery(username);

  const { ToggleFollow } = useFollowUnfollow();
  const handleUnFollow = async (followerId) => {
    const response = await ToggleFollow(followerId);
    console.log(response, "RESPONSE");
  };

  const navigate = useNavigate();

  return (
    <div className="followers-modal">
      <div className="modal-header">
        <h2>Followers</h2>
        <button className="close-btn" onClick={() => navigate(-1)}>
          &times;
        </button>
      </div>
      <div className="followers-list">
        {data?.data?.followers?.length === 0 && (
          <p className="no-followers">No followers yet</p>
        )}

        {data?.data?.followers?.map((follower) => (
          <div key={follower.id} className="follower-card">
            <div className="follower-info">
              <img
                src={DEFAULT_PHOTO_URL || follower.avatar?.url}
                alt={follower.name}
              />
              <div className="follower-details">
                <Link to={`/profile/${follower.username}`}>
                  <h4>{follower.username}</h4>
                </Link>
                <p>
                  {follower.profile.firstName} {follower.profile.lastName}
                </p>
              </div>
            </div>
            {currentUser !== follower.username && (
              <button
                className="follow-btn"
                onClick={() => handleUnFollow(follower._id, follower.username)}
              >
                {follower.isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerModal;
