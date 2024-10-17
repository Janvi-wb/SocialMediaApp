import "./Login.scss";
import { useState } from "react";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div>
      <div className="container">
        <div className="box">
          <div className="heading"></div>
          <form className="login-form">
            {!isRegistered && (
              <div className="field">
                <input id="email" type="email" placeholder="Email" />
                <label htmlFor="email">Email</label>
              </div>
            )}
            <div className="field">
              <input
                id="username"
                type="name"
                placeholder="Phone number, username, or email"
              />
              <label htmlFor="username">{isRegistered ? "Phone number, username, or email" : "Username"}</label>
            </div>
            <div className="field">
              <input id="password" type="password" placeholder="password" />
              <label htmlFor="password">Password</label>
            </div>
            <button className="login-button" title="login">
              {isRegistered ? "Log In" : "Sign In"}
            </button>

            {isRegistered && <div className="other">
              <a className="forgot-password" href="#">
                Forgot password?
              </a>
            </div>}
          </form>
        </div>
        <div className="box">
          <p>
            {isRegistered ? "Do not have an account? " : "Have an Account? "}
            <a className="signup" href="#" onClick={toggleForm}>
              {isRegistered ? "Sign Up" : "Log In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
