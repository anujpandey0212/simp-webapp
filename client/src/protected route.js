import React from "react";
import { Route ,useNavigate,useLocation,Navigate} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  const navigate=useNavigate();
  const location = useLocation();
  return isAuthenticated ? <Navigate to="/simulation" state={{link:location.state.link}}></Navigate> : <Navigate to="/notfound" />;
};
