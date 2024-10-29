import "./Login.scss";
import { useRef, useState } from "react";
import { useRegisterUser } from "../Auth/hooks/useRegisterUser";

const Loginn = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const { userLogin, userSignup } = useRegisterUser();

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = !isRegistered ? emailRef.current.value : null;

    //console.log("Form submitted, isRegistered:", isRegistered);

    const formData = {
      username,
      password,
      ...(email && { email }), // Add email only if in sign-up mode
    };

    //console.log(formData, "DATA");

    isRegistered
      ? await userLogin(formData)
      : await userSignup(formData, toggleForm);
  };

  return (
    <div>
      <div className="auth-container">
        <div className="box">
          <div className="heading"></div>
          <form className="login-form" onSubmit={handleSubmit}>
            {!isRegistered && (
              <div className="field">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            )}
            <div className="field">
              <input
                ref={usernameRef}
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="field">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="login-button">
              {isRegistered ? "Log In" : "Sign Up"}
            </button>

            {isRegistered && (
              <div className="other">
                <p className="forgot-password">Forgot password?</p>
              </div>
            )}
          </form>
        </div>

        <div className="box">
          <p>
            {isRegistered ? "Do not have an account? " : "Have an Account? "}
            <span className="signup" onClick={toggleForm}>
              {isRegistered ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginn;
