import { Link } from "react-router-dom";
import "./Footer.scss";
import { useSelector } from "react-redux";

const Footer = () => {
  const profilePicture = useSelector(
    (store) => store?.profile?.profile?.account?.avatar?.url
  );

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="sidebar">
        <div className="logo-written">
          <img src="https://th.bing.com/th/id/OIP.DexBeSiGPUP4igHscKierwHaCi?rs=1&pid=ImgDetMain" alt="Instagram Logo" />
        </div>
        <div className="logo-icon">
          <img src="https://th.bing.com/th/id/OIP.8T7ThzxPi47G_LV0YFRsJgAAAA?rs=1&pid=ImgDetMain" alt="Instagram Logo" />
        </div>
        <Link to="/home" className="menu-item"><i className="fa-solid fa-house"></i><span>Home</span></Link>
        <Link to="/home" className="menu-item"><i className="fa-solid fa-magnifying-glass"></i><span>Search</span></Link>
        <Link to="/explore" className="menu-item"><i className="fa-regular fa-compass"></i><span>Explore</span></Link>
        <Link to="/home" className="menu-item"><i className="fa-solid fa-clapperboard"></i><span>Reels</span></Link>
        <Link to="/home" className="menu-item"><i className="fa-solid fa-paper-plane"></i><span>Messages</span></Link>
        <Link to="/home" className="menu-item"><i className="fa-solid fa-heart"></i><span>Notifications</span></Link>
        <Link to="/createPost" className="menu-item"><i className="fa-solid fa-square-plus"></i><span>Create Post</span></Link>
        <Link to="/profile" className="menu-item"><img className="profile-img" src={profilePicture} /><span>Profile</span></Link>
        <Link to="/logout"><button className="menu-item logout-button"><i className="fa-solid fa-right-from-bracket"></i><span>Logout</span></button></Link>
      </div>

      {/* Footer for smaller screens */}
      <div className="footer">
        <Link to="/home"><i className="fa-solid fa-house"></i></Link>
        <Link to="/explore"><i className="fa-regular fa-compass"></i></Link>
        <Link to="/createPost"><i className="fa-solid fa-square-plus"></i></Link>
        <Link to="/reel"><i className="fa-solid fa-clapperboard"></i></Link>
        <Link to="/profile"><img className="profile-img" src={profilePicture} /></Link>
      </div>
    </>
  );
};


export default Footer;
