import { useGetProfileQuery } from "../../../../store/profileApiSlice";

export const useProfile = () => {
  const { data: profileData, isLoading, error } = useGetProfileQuery();

  return { profile: profileData?.data, isLoading, error };
};
