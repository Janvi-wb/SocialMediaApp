import { useSelector } from "react-redux";
import { DEFAULT_PHOTO_URL } from "../../../../utils/constants";


const Header = () => {
    const profile = useSelector(store => store.profile.profile);
    console.log(profile);
  
    return (
    <>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img
                src={DEFAULT_PHOTO_URL || profile.account.avatar.url}
                alt="Profile"
              />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{profile.account.username}</h1>
              <button className="btn profile-edit-btn">Edit Profile</button>
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
                  <span className="profile-stat-count">{profile.followersCount}</span> posts
                </li>
                <li>
                  <span className="profile-stat-count">{profile.followersCount}</span> followers
                </li>
                <li>
                  <span className="profile-stat-count">{profile.followingCount}</span> following
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{profile.account.username}</span> {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
