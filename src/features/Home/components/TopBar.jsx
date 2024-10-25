import './TopBar.scss';

const TopBar = () => {
  return (
    <div className="top-bar">
        <div className="logo"></div>
      {/* <input type="text" placeholder="Search" className="search-bar" /> */}
      <div className="top-icons">
        <i className="fa-regular fa-heart"></i>
      </div>
    </div>
  );
};

export default TopBar;
