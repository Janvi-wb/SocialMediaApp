import Footer from "../Home/components/Footer";
import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile-container">
      <Header />
      <div className="content">
        <PostGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
