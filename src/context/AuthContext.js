import React, { createContext, useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "../userpool";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (!err && session.isValid()) {
          setUser(currentUser);
        }
      });
    }
    setChecked(true)
  }, []);

  const login = (Email, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: Email,
        Pool: userpool,
      });

      const authDetails = new AuthenticationDetails({
        Username: Email,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log("Login successful");
          setUser(user);
          resolve(result);
        },
        onFailure: (err) => {
          console.log("Login failed", err);
          reject(err);
        },
      });
    });
  };

  const logout = () => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setUser(null);
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
