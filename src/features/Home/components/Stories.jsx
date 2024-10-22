import PropTypes from 'prop-types'; 
import './Stories.scss';
import { useSelector } from 'react-redux';

const Stories = () => {
    const profilePicture = useSelector(store => store.profile.profile.coverImage.url);

  return (
    <div className="stories">
      <div className="story">
        <img
          src={profilePicture}
          alt={"Story"}
          className="story-image"
        />
      </div>
    </div>
  );
};

Stories.propTypes = {
  avatarUrl: PropTypes.string,
};

export default Stories;
