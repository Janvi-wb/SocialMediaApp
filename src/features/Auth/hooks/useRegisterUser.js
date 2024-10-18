import { useDispatch } from "react-redux";
import { addCredentials } from "../../../../store/userSlice";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../../../store/authApiSlice";
import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log(response.data);
      if (response.success) {
        dispatch(
          addCredentials({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("Login successfull!");
        navigate("/home");
      } else {
        console.log(response?.message);
      }
    } catch (e) {
      console.log(e?.data?.message);
    }
  };

  const userSignup = async (data, toggleForm) => {
    console.log(data, "VALUE");
    try{
      const response = await signup(data).unwrap();
      if(response.success) {
        dispatch(addCredentials({
          user: response.data.user,
          token: response.data.accessToken,
        }));
        console.log("Signup Successfully!");
        toggleForm();
      } else {
        console.log(response?.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { userLogin, userSignup };
};

