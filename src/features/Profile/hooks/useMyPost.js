import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyPostsQuery } from '../../../../store/postApiSlice';
import { setPosts, setStatus, setError } from "./../../../../store/postSlice"

export const useMyPost = () => {
  const dispatch = useDispatch();
  const { data: postData, error, isLoading } = useGetMyPostsQuery();
  //console.log(postData, "DATA");

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus('loading'));
    } else if (postData) { 
      dispatch(setPosts(postData?.data.posts));
      //console.log(postData?.data.posts, "IN HOOK");
      dispatch(setStatus('succeeded'));
    } else if (error) {
      dispatch(setError(error.message));
      dispatch(setStatus('failed'));
    }
  }, [postData, isLoading, error, dispatch]);
  
  // data is not stored in  
  const posts = useSelector((state) => state?.myPosts?.posts);
  //console.log(posts);
  const status = useSelector((state) => state?.myPosts?.status);
  const errorMessage = useSelector((state) => state?.myPosts?.error);


  return { posts, status, errorMessage };
};
