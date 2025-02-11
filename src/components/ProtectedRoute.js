import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user, isChecked } = useContext(AuthContext);
  return(<div>{isChecked && <div>{user ? children : <Navigate to="/login" /> }</div>}</div> );
};

export default ProtectedRoute;
