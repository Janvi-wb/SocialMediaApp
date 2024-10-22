import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyPostsQuery } from '../../../../store/postApiSlice';
import { setPosts, setStatus, setError } from "./../../../../store/postSlice"

export const useMyPost = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetMyPostsQuery();
  console.log(data);

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus('loading'));
    } else if (data && data.posts) {
      dispatch(setPosts(data?.posts));
      dispatch(setStatus('succeeded'));
    } else if (error) {
      dispatch(setError(error.message));
      dispatch(setStatus('failed'));
    }
  }, [data, isLoading, error, dispatch]);
  
  const posts = useSelector((state) => state.posts.posts || []);
  console.log(posts);
  const status = useSelector((state) => state.posts.status);
  const errorMessage = useSelector((state) => state.posts.error);


  return { posts, status, errorMessage };
};
