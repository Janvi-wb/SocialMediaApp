// import { useSelector } from "react-redux";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "../../Home/hooks/useProfile";
import { useSelector } from "react-redux";
import useFollowUnfollow from "../../Home/hooks/useFollowUnfollow";
import { useState } from "react";
import HeaderShimmer from "../../../Shimmers/HeaderShimmer";

const Header = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const user = useSelector((store) => store?.user?.user);
  const { profile, isLoading, refetch } = useProfile();

  const myPosts = useSelector(store => store.myPosts.posts);

  const { ToggleFollow } = useFollowUnfollow();

  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing);

  const handleUnFollow = async (followerId) => {
    setIsFollowing(!isFollowing);

    const response = await ToggleFollow(followerId);
    if (response?.success) {
      refetch();
    } else {
      setIsFollowing(!isFollowing);
    }
  };

  if (isLoading) return <HeaderShimmer />;

  return (
    <>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img
                src={DEFAULT_PHOTO_URL || profile?.account?.avatar?.url}
                alt="Profile"
              />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">
                {profile?.account?.username}
              </h1>
              {!userName && (
                <Link to="/profile/edit">
                  <button className="btn profile-edit-btn">Edit Profile</button>
                </Link>
              )}
              {userName && userName !== user.username && (
                <button
                  onClick={() => handleUnFollow(profile.account._id, userName)}
                  className="btn profile-edit-btn"
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">
                    {myPosts.length}
                  </span>{" "}
                  posts
                </li>
                <li>
                  <Link to={`/followers/${profile?.account?.username}`}>
                    <span className="profile-stat-count">
                      {profile.followersCount}
                    </span>{" "}
                    followers
                  </Link>
                </li>
                <li>
                  <Link to={`/following/${profile?.account?.username}`}>
                    <span className="profile-stat-count">
                      {profile.followingCount}
                    </span>{" "}
                    following
                  </Link>
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">
                  {profile.account.username}{" "}
                </span>
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
