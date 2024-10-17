// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../../../store/slices/userSlice";

// const useRegisterUser = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   let data;

//   const user = useSelector((store) => store.user);
//   console.log(user, "USER");

//   const makeRequest = async (url, method = "POST", body = {}) => {
//     setLoading(true);
//     setError(null); 

//     const options = {
//       method,
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(body),
//     };

    

//     try {
//       const response = await fetch(url, options);
//       data = await response.json();
//       dispatch(addUser(data));
//       return data; 
//     } catch (err) {
//       setError(err.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { makeRequest, loading, error, data };
// };

// export default useRegisterUser;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../store/slices/userSlice";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const makeRequest = async (url, method = "POST", body = {}) => {
    setLoading(true);
    setError(null);

    const options = {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      console.log("Making request to:", url, "with body:", body);  // Log URL and body
      const response = await fetch(url, options);

      // Check if response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);  // Log response data

      dispatch(addUser(data));
      return data;
    } catch (err) {
      console.error("Request failed:", err);  // Log the error
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { makeRequest, loading, error };
};

export default useRegisterUser;
