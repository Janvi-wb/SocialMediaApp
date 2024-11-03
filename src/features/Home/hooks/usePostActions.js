/* eslint-disable no-unused-vars */
// import { useDispatch, useSelector } from "react-redux";
// import { useBookmarkPostMutation, useLikePostMutation } from "../../../../store/postApiSlice";
// import { addAllPosts } from "../../../../store/allPostsSlice";

// export const usePostActions = (postId, likes) => {
//   const [likePost] = useLikePostMutation();
//   const [bookmarkPost] = useBookmarkPostMutation();
//   const dispatch = useDispatch();
//   const allPosts = useSelector((state) => state.allPosts.allPosts);

//   const updatePostInStore = (postId, updatedData, posts) => {
//     return posts.map((post) =>
//       post._id === postId ? { ...post, ...updatedData } : post
//     );
//   };

//   const handleLike = async () => {
//     try {
//       const response = await likePost(postId).unwrap();
//       const updatedPosts = updatePostInStore(
//         postId,
//         {
//           isLiked: response.data.isLiked,
//           likes: response.data.isLiked ? likes + 1 : likes - 1,
//         },
//         allPosts
//       );
//       dispatch(addAllPosts(updatedPosts));
//     } catch (error) {
//       console.error("Error liking post: ", error);
//     }
//   };

//   const handleBookmark = async () => {
//     try {
//       const response = await bookmarkPost(postId).unwrap();
//       const updatedPosts = updatePostInStore(
//         postId,
//         { isBookmarked: response.data.isBookmarked },
//         allPosts
//       );
//       dispatch(addAllPosts(updatedPosts));
//     } catch (error) {
//       console.error("Error bookmarking post: ", error);
//     }
//   };

//   return { handleLike, handleBookmark, allPosts };
// };


// hooks/usePostActions.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useBookmarkPostMutation, useLikePostMutation } from "../../../../store/postApiSlice";

export const usePostActions = (initialPost) => {
  const { _id: postId, isLiked: initialIsLiked, isBookmarked: initialIsBookmarked, likes: initialLikes } = initialPost;

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [likes, setLikes] = useState(initialLikes);

  const [likePost] = useLikePostMutation();
  const [bookmarkPost] = useBookmarkPostMutation();
  const dispatch = useDispatch();

  // Handle like/unlike functionality
  const handleLike = useCallback(async () => {
    try {
      const response = await likePost(postId).unwrap();
      setIsLiked(response.data.isLiked);
      setLikes((prevLikes) => (response.data.isLiked ? prevLikes + 1 : prevLikes - 1));
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  }, [likePost, postId]);

  // Handle bookmark/unbookmark functionality
  const handleBookmark = useCallback(async () => {
    try {
      const response = await bookmarkPost(postId).unwrap();
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error("Error bookmarking post: ", error);
    }
  }, [bookmarkPost, postId]);

  return {
    isLiked,
    isBookmarked,
    likes,
    handleLike,
    handleBookmark,
  };
};
