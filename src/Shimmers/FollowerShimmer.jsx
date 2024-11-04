import './FollowerShimmer.scss'; // Import the SCSS file

const FollowerShimmer = () => {
  return (
    <div className="connections-list">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="connection-card-shimmer">
          <div className="avatar-shimmer shimmer"></div>
          <div className="info-shimmer">
            <div className="username-shimmer shimmer"></div>
            <div className="name-shimmer shimmer"></div>
          </div>
          <div className="button-shimmer shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default FollowerShimmer;
