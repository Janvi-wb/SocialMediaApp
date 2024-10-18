import { useGetProfileQuery } from "../../../../store/profileApiSlice";

export const useProfile = () => {
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  console.log(profileData?.data, "DataInHook");

  return { profile: profileData?.data, isLoading, error };
};
