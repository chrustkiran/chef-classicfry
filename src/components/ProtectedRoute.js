import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { use } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isChecked } = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, [isChecked]);
  return(<div>{isChecked && <div>{user ? children : <Navigate to="/login" /> }</div>}</div> );
};

export default ProtectedRoute;
