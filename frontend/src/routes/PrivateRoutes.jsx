import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user);  // Get user from Redux store
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
