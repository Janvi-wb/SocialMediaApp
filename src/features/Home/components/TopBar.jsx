import { Link } from 'react-router-dom';
import './TopBar.scss';

const TopBar = () => {
  return (
    <div className="top-bar">
        <div className="logo"></div>
      {/* <input type="text" placeholder="Search" className="search-bar" /> */}
      <div className="top-icons">
        <i className="fa-regular fa-heart"></i>
        <Link to="/logout"><button className="menu-item logout-button"><i className="fa-solid fa-right-from-bracket"></i></button></Link>
      </div>
    </div>
  );
};

export default TopBar;
