import { useDispatch } from "react-redux";
import { addCredentials } from "../../../../store/userSlice";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../../../store/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        dispatch(
          addCredentials({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("You're Logged in!")
        navigate("/home");
      } else {
        toast.error(response.message || "Try Again!")
      }
      return response;
    } catch (e) {
      toast.error(e.data?.message || 'Try again.');
    }
  };

  const userSignup = async (data, toggleForm) => {
    //console.log(data, "VALUE");
    try {
      const response = await signup(data).unwrap();
      if (response.success) {
        //console.log(response.data);
        dispatch(
          addCredentials({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        toast.success("You're Signed up!")
        toggleForm();
      } else {
        toast.error(response.message || "Try Again!")
      }
      return {response};
    } catch (e) {
      toast.error(e.data?.message || 'Try again.');
    }
  };

  const userLogout = () => {
    dispatch(addCredentials({ user: null, token: null }));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return { userLogin, userSignup, userLogout, isSignupLoading, isLoginLoading };
};
