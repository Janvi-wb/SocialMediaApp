/* eslint-disable no-unused-vars */
// import "./Login.scss";
// import { useRef, useState } from "react";
// import { useRegisterUser } from "../Auth/hooks/useRegisterUser";

// const Loginn = () => {
//   const [isRegistered, setIsRegistered] = useState(true);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const emailRef = useRef(null);

//   const { userLogin, userSignup } = useRegisterUser();

//   const toggleForm = () => {
//     setIsRegistered(!isRegistered);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const username = usernameRef.current.value;
//     const password = passwordRef.current.value;
//     const email = !isRegistered ? emailRef.current.value : null;

//     //console.log("Form submitted, isRegistered:", isRegistered);

//     const formData = {
//       username,
//       password,
//       ...(email && { email }), // Add email only if in sign-up mode
//     };

//     //console.log(formData, "DATA");

//     isRegistered
//       ? await userLogin(formData)
//       : await userSignup(formData, toggleForm);
//   };

//   return (
//     <div>
//       <div className="auth-container">
//         <div className="box">
//           <div className="heading"></div>
//           <form className="login-form" onSubmit={handleSubmit}>
//             {!isRegistered && (
//               <div className="field">
//                 <input
//                   ref={emailRef}
//                   id="email"
//                   name="email"
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
//                 name="username"
//                 type="text"
//                 placeholder="Username"
//                 required
//               />
//               <label htmlFor="username">Username</label>
//             </div>
//             <div className="field">
//               <input
//                 ref={passwordRef}
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//             </div>
//             <button type="submit" className="login-button">
//               {isRegistered ? "Log In" : "Sign Up"}
//             </button>

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

// export default Loginn;

import "./Login.scss";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUser } from "../Auth/hooks/useRegisterUser";
import { ClipLoader } from "react-spinners";

const Loginn = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const { userLogin, userSignup, isSignupLoading, isLoginLoading } =
    useRegisterUser();

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    email: !isRegistered
      ? Yup.string()
          .email("Invalid email format")
          .required("Email is required for signup")
      : Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      const { username, password, email } = values;
      const formData = { username, password, ...(email && { email }) };

      const { response } = isRegistered
        ? await userLogin(formData)
        : await userSignup(formData, toggleForm);

      // If registration is successful (for signup), toggle the form
      if (!isRegistered && response?.status == 200) {
        toggleForm();
      }

      // Handle the error based on the status code from the API
      if (response?.status === 409) {
        setStatus("User with email or username already exists");
      } else if (response?.status === 401) {
        setStatus("Invalid user credentials");
      } else if (response?.status === 404) {
        setStatus("User does not exist");
      } else if (response?.status === 200) {
        setStatus("Login Successful!");
      } else {
        setStatus("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div>
      <div className="auth-container">
        <div className="box">
          <div className="heading"></div>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            {formik.status && (
              <div className="error-message">{formik.status}</div>
            )}
            {!isRegistered && (
              <div className="field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "input-error"
                      : ""
                  }
                />
                <label htmlFor="email">Email</label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            )}
            <div className="field">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  formik.touched.username && formik.errors.username
                    ? "input-error"
                    : ""
                }
              />
              <label htmlFor="username">Username</label>
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="field">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? "input-error"
                    : ""
                }
              />
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="login-button">
              {isSignupLoading || isLoginLoading
                ? "Loading..."
                : isRegistered
                ? "Log In"
                : "Sign Up"}
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
