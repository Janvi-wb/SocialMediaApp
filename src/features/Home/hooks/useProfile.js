import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../../../../store/profileApiSlice";
import { setProfile, setLoading, setError } from "../../../../store/profileSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const userName = location.pathname.split("/")[2];
  //console.log(userName, "IN HOOK");
  //const userName = useSelector(store => store?.user?.user?.userName);
  const { data: profileData, isLoading, error, refetch } = useGetProfileQuery(userName);

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
  //console.log(profileData?.data, "DATA FROM HOOK");

  return { profile: profileData?.data, isLoading, error, refetch };
};
