// import "./Login.scss";
// import { useState, useRef } from "react";
// import useRegisterUser from "./hooks/useRegesterUser";
// import { LOCALHOST_URL } from "../../../utils/constants";

// const Login = () => {
//   const [isRegistered, setIsRegistered] = useState(true);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const emailRef = useRef(null);

//   const { makeRequest, loading, error } = useRegisterUser();

//   const toggleForm = () => {
//     setIsRegistered(!isRegistered);
//   };

//   // Handle Register
//   const handleRegister = async () => {
//     //e.preventDefault();  // Prevents form submission from refreshing the page

//     const url = LOCALHOST_URL + "users/register";
//     const body = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//       username: usernameRef.current.value,
//       role: "USER",
//     };

//     const result = await makeRequest(url, "POST", body);
//     console.log("Register Success:", result);
//     // Handle success (e.g., redirect to login page)
//   };

//   // Handle Login
//   const handleLogin = async () => {
//     //e.preventDefault();  // Prevents form submission from refreshing the page

//     const url = LOCALHOST_URL + "users/login";
//     const body = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//     };

//     const result = await makeRequest(url, "POST", body);
//     console.log("Login Success:", result);
//     // Handle success (e.g., store token, redirect)
//   };

//   const handleSubmit = () => {
//     isRegistered ? handleLogin : handleRegister;
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="box">
//           <div className="heading">{isRegistered ? "Log In" : "Sign Up"}</div>
//           <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//             {!isRegistered && (
//               <div className="field">
//                 <input
//                   ref={emailRef}
//                   id="email"
//                   type="email"
//                   placeholder="Email"
//                   required
//                 />
//                 <label htmlFor="email">Email</label>
//               </div>
//             )}
//             <div className="field">
//               <input
//                 ref={usernameRef}
//                 id="username"
//                 type="text"
//                 placeholder={
//                   isRegistered ? "Phone number, username, or email" : "Username"
//                 }
//                 required
//               />
//               <label htmlFor="username">
//                 {isRegistered ? "Phone number, username, or email" : "Username"}
//               </label>
//             </div>
//             <div className="field">
//               <input
//                 ref={passwordRef}
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//             </div>
//             <button
//               className="login-button"
//               type="submit"
//               disabled={loading}
//               onClick={handleSubmit}
//             >
//               {loading ? "Loading..." : isRegistered ? "Log In" : "Sign Up"}
//             </button>

//             {error && <p className="error">{error}</p>}

//             {isRegistered && (
//               <div className="other">
//                 <p className="forgot-password">Forgot password?</p>
//               </div>
//             )}
//           </form>
//         </div>
//         <div className="box">
//           <p>
//             {isRegistered ? "Do not have an account? " : "Have an Account? "}
//             <span className="signup" onClick={toggleForm}>
//               {isRegistered ? "Sign Up" : "Log In"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import "./Login.scss";
import { useState, useRef } from "react";
import useRegisterUser from "./hooks/useRegesterUser";
import { LOCALHOST_URL } from "../../../utils/constants";

const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const { makeRequest, error } = useRegisterUser();

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  // Register
  const handleRegister = async () => {
    console.log("registering....");
    const url = {LOCALHOST_URL} + "users/register";
    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
      role: "USER",
    };

    console.log("Registering user with:", body);  

    const result = await makeRequest(url, "POST", body);
    console.log("Register Success:", result);
    // Handle success (e.g., redirect to login page)
  };

  // Handle Login
  const handleLogin = async () => {
    console.log("loging...");
    const url = {LOCALHOST_URL} + "users/login";
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("Logging in user with:", body);  // Log login details

    const result = await makeRequest(url, "POST", body);
    console.log("Login Success:", result);
    // Handle success (e.g., store token, redirect)
  };

  const handleSubmit = (e) => {
    console.log("Handling submit...");
    e.preventDefault(); // Prevent page refresh
    console.log("Form submitted, isRegistered:", isRegistered);
    isRegistered ? handleLogin() : handleRegister();
  };

  return (
    <div>
      <div className="container">
        <div className="box">
          <div className="heading">{isRegistered ? "Log In" : "Sign Up"}</div>
          <form className="login-form" onSubmit={handleSubmit}>
            {!isRegistered && (
              <div className="field">
                <input
                  ref={emailRef}
                  id="email"
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
                type="text"
                placeholder={
                  isRegistered
                    ? "Phone number, username, or email"
                    : "Username"
                }
                required
              />
              <label htmlFor="username">
                {isRegistered
                  ? "Phone number, username, or email"
                  : "Username"}
              </label>
            </div>
            <div className="field">
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="login-button"
            >
              {isRegistered ? "Log In" : "Sign Up"}
            </button>

            {error && <p className="error">{error}</p>}

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

export default Login;
