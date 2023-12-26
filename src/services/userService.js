/** @format */
import axios from "../axios";

const handleLogin = (userEmail, userPassword) => {
  return axios.post(
    "/api/login",
    { email: userEmail, password: userPassword },
    {
      withCredentials: true,
    }
  );
};

export { handleLogin };
