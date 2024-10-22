import { Link } from "react-router-dom/dist";
import "./Footer.scss";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Footer = () => {
  const profilePicture = useSelector(
    (store) => store.profile.profile.account.avatar.url
  );
  return (
    <div className="footer">
      {/* <span className="footer-icon">
        <img className="icon-img" src={HOME_ICON_URL} />
      </span>
      <span className="footer-icon">
        <img className="icon-img" src={NAVIGATOR_ICON_URL} />
      </span>
      <span className="footer-icon">
        <img className="icon-img" src={REEL_ICON_URL} />
      </span>
      <span className="footer-icon">
        <img className="icon-img" src={CREATE_POST_ICON_URL} />
      </span> */}
      <i className="fa-solid fa-house"></i>
      <i className="fa-regular fa-compass"></i>
      <i className="fa-solid fa-square-plus"></i>
      <i className="fa-solid fa-clapperboard"></i>

      <Link to="/profile">
        <img className="profile-img" src={profilePicture} />
      </Link>
    </div>
  );
};

Footer.propTypes = {
  profilePicture: PropTypes.string,
};

export default Footer;
