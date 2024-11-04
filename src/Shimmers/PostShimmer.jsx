import "./PostShimmer.scss"

const PostShimmer = () => {
    console.log("Shimmer Called ");
  return (
    <div className="post_container">
    <div className="post_header_shimmer">
      <div className="post_details_shimmer">
        <div className="post_avatar_shimmer"></div>
        <div className="post_info_shimmer">
          <p className="post_info_name_shimmer"></p>
          <p className="post_info_time_shimmer"></p>
        </div>
      </div>
      <div className="post_actions_shimmer"></div>
    </div>

    <div className="post_content_shimmer"></div>

    <div className="post_actions_shimmer">
      <div className="post_actions_left_shimmer"></div>
      <div className="post_actions_right_shimmer"></div>
    </div>

    <div className="post_footer_shimmer">
      <p className="post_footer_likes_shimmer"></p>
      <p className="post_footer_caption_shimmer"></p>
      <p className="post_footer_comments_shimmer"></p>
      <div className="post_footer_comment_shimmer"></div>
    </div>
  </div>
  )
}

export default PostShimmer;
