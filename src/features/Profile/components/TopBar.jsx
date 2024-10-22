import "./TopBar.scss"; // Add your styling here

const TopBar = () => {
  return (
    <div className="topbar">
      <h2 className="username">Lorem Ipsum</h2>
      <div className="icons">
        <i className="icon-settings"></i> 
        <i className="icon-more-options"></i> 
      </div>
    </div>
  );
};

export default TopBar;
