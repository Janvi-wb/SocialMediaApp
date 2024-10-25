import "./PostShimmer.scss";

const PostShimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-header">
        <div className="shimmer-profile"></div>
        <div className="shimmer-username"></div>
      </div>
      <div className="shimmer-image"></div>
      <div className="shimmer-footer">
        <div className="shimmer-text" style={{ width: "60%" }}></div>
        <div className="shimmer-text" style={{ width: "80%" }}></div>
        <div className="shimmer-text" style={{ width: "70%" }}></div>
      </div>
    </div>
  );
};

export default PostShimmer;
