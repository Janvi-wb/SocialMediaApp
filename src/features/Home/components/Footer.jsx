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
      <Link to="/home">
        <i className="fa-solid fa-house"></i>
      </Link>
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
