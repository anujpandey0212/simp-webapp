import React from "react";
import { Route ,useNavigate,useLocation} from "react-router-dom";

export const ProtectedRoute = ({component: Component}) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  const navigate=useNavigate();
  const location = useLocation();
  return (
    <Route
      render={()=> {
        if (isAuthenticated) {
          return <Component/>;
        } else {
          return (
            navigate("/simulation",{state:{link:location.state.link}})
          );
        }
      }}
    />
  );
};
