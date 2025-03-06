import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user);


  if (!user) {
    return <Navigate to="/user-login" />;
  }


  return <Outlet />;
};


export default PrivateRoute;
