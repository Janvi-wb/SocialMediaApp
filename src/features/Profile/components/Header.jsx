// import { useSelector } from "react-redux";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "../../Home/hooks/useProfile";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const user = useSelector((store) => store?.user?.user);
  //console.log(user, "USERNAME");
  // console.log(profile, "PROFILE DATA");
  const {profile, isLoading} = useProfile();
  //console.log(profile?.isFollowing, "PROFILE ISFOLLOWING");

  if(isLoading) return <h1>loading...</h1>
  //console.log(profile?.isFollowing, "PROFILE ISFOLLOWING");

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
              <h1 className="profile-user-name">{profile?.account?.username}</h1>
              <button className="btn profile-edit-btn">Edit Profile</button>
              {(userName  && userName !== user.username) && <button className="btn profile-edit-btn">{(profile.isFollowing) ? "Following" : "Follow"}</button>}
              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <i className="fas fa-cog" aria-hidden="true"></i>
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">
                    {profile.followersCount}
                  </span>{" "}
                  posts
                </li>
                <li>
                  <Link to={`/followers/${profile?.account?.username}`}>
                    <span className="profile-stat-count">
                      {profile.followersCount}
                    </span>
                    followers
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/following/${profile?.account?.username}`}
                  >
                    <span className="profile-stat-count">
                      {profile.followingCount}
                    </span>
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
