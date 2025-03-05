import API from "./api";

// Register a doctor
export const registerDoctor = async (doctorData) => {
  const response = await API.post("/doctors/register", doctorData);
  return response.data;
};

// Login doctor
export const loginDoctor = async (doctorData) => {
  const response = await API.post("/doctors/login", doctorData);
  return response.data;
};

// Get user profile (for both users and doctors)
export const getUserProfile = async (token, role) => {
  const endpoint = role === "doctor" ? "/doctors/profile" : "/users/profile"; 
  const response = await API.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Register a user
export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};

// Login a user
export const loginUser = async (userData) => {
  const response = await API.post("/users/login", userData); 
  return response.data;
};
