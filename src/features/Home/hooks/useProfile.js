import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../../../../store/profileApiSlice";
import { setProfile, setLoading, setError } from "../../../../store/profileSlice";
import { useEffect } from "react";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { data: profileData, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    dispatch(setLoading(true));
  } else {
    dispatch(setLoading(false));
  }

  if (error) {
    dispatch(setError(error));
  }

  useEffect(() => {
    if (profileData) {
        dispatch(setProfile(profileData.data)); 
      }
  })

  return { profile: profileData?.data, isLoading, error };
};
