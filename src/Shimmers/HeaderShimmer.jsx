import './HeaderShimmer.scss';

const HeaderShimmer = () => {
    return (
        <div className="header_shimmer">
            <div className="profile_picture_shimmer"></div>
            <div className="profile_info_shimmer">
                <div className="username_shimmer"></div>
                <div className="follower_count_shimmer">
                    <span className="follow_count_shimmer"></span>
                    <span className="following_count_shimmer"></span>
                </div>
            </div>
            <div className="action_buttons_shimmer">
                <div className="follow_button_shimmer"></div>
                <div className="following_button_shimmer"></div>
            </div>
        </div>
    );
};

export default HeaderShimmer;
