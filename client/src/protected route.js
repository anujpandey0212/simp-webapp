import React from "react";
import { Route ,useNavigate,useLocation,Navigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate();
  const location = useLocation();
  const {user,isAuthenticated}=useAuth0();
  return isAuthenticated ? <Navigate to="/simulation" state={{link:location.state.link}}></Navigate> : <Navigate to="/notfound" />;
};
