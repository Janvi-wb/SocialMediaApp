import './TopBar.scss';

const TopBar = () => {
  return (
    <div className="top-bar">
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="top-icons">
        <span className="top-icon">&#x2665;</span>
        <span className="top-icon">&#128276;</span>
      </div>
    </div>
  );
};

export default TopBar;
