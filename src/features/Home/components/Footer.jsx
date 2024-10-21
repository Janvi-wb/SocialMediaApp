import { Link } from "react-router-dom/dist";
import {
  CREATE_POST_ICON_URL,
  HOME_ICON_URL,
  NAVIGATOR_ICON_URL,
  REEL_ICON_URL,
} from "../../../../utils/constants";
import "./Footer.scss";
import PropTypes from "prop-types";

const Footer = ({ profilePicture }) => {
  return (
    <div className="footer">
      <span className="footer-icon">
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
      </span>
      <Link to="/profile">
        <span className="footer-icon">
          <img className="icon-img" src={profilePicture} />
        </span>
      </Link>
    </div>
  );
};

Footer.propTypes = {
  profilePicture: PropTypes.string,
};

export default Footer;
