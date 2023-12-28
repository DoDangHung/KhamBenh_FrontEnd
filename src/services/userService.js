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

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, {
    id: inputId,
  });
};

export { handleLogin, getAllUsers };
