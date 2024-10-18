import PropTypes from 'prop-types'; 
import './Stories.scss';

const Stories = ({ avatarUrl }) => {
  return (
    <div className="stories">
      <div className="story">
        <img
          src={avatarUrl || 'https://via.placeholder.com/40x40.png'}
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
