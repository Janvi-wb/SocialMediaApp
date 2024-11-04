import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFollowersUserQuery } from "../../../../store/profileApiSlice";
import useFollowUnfollow from "../../Home/hooks/useFollowUnfollow";
import "./Follow.scss";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import FollowerShimmer from "../../../Shimmers/FollowerShimmer";

const FollowerModal = () => {
  const { username } = useParams(); // Get the userId from the route
  const currentUser = useSelector((state) => state.user?.user?.username);
  const { data, refetch, isLoading } = useFollowersUserQuery(username);
  console.log(data);

  const { ToggleFollow } = useFollowUnfollow();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (data?.data?.followers) {
      setFollowers(data.data.followers);
    }
  }, [data]);

  const handleUnFollow = async (followerId) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower._id === followerId
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );

    const response = await ToggleFollow(followerId);
    if (response.success) {
      refetch();
    } else {
      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower._id === followerId
            ? { ...follower, isFollowing: !follower.isFollowing }
            : follower
        )
      );
    }
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
        {isLoading ? (
          <FollowerShimmer />
        ) : (
          <>
            {data?.data?.followers?.length === 0 && (
              <p className="no-followers">No followers yet</p>
            )}
            {followers.map((follower) => (
              <div key={follower._id} className="follower-card">
                <div className="follower-info">
                  <img
                    src={follower.avatar?.url || DEFAULT_PHOTO_URL}
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
                    onClick={() => handleUnFollow(follower._id)}
                  >
                    {follower.isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowerModal;
