import Footer from "../Home/components/Footer";
import TopBar from "../Home/components/TopBar";
import Header from "./components/Header";
import PostGrid from "./components/PostGrid";
import "./Profile.scss";
import { useMyPost } from "./hooks/useMyPost";


const Profile = () => {
    useMyPost();
    
  return (
    <div className="profile-container">
        <TopBar />
      <Header />
      <div className="content">
        <PostGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
