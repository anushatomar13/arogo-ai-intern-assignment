import API from "./api";

export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/users/login", userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await API.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
