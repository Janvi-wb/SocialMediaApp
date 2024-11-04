import "./ProfileShimmer.scss";

const ProfileShimmer = () => {
  return (
    <div className="profile-shimmer">
      {/* Header */}
      <div className="profile-header-shimmer">
        <div className="avatar-shimmer shimmer"></div>
        <div className="info-shimmer">
          <div className="username-shimmer shimmer"></div>
          <div className="button-shimmer shimmer"></div>
          <div className="stats-shimmer">
            <div className="stat shimmer"></div>
            <div className="stat shimmer"></div>
            <div className="stat shimmer"></div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-bio-shimmer">
        <div className="line shimmer"></div>
        <div className="line shimmer short"></div>
      </div>

      {/* Posts / Gallery */}
      <div className="profile-gallery-shimmer">
        {Array(9).fill().map((_, index) => (
          <div key={index} className="gallery-item-shimmer shimmer"></div>
        ))}
      </div>
    </div>
  );
};

export default ProfileShimmer;
