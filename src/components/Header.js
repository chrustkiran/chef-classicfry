import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";


const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="d-flex  gap-3 px-0 justify-content-center">
      <div style={{borderRadius: '50px', border: '1px solid black'}} className="d-flex gap-3 px-0 shadow=sm">
        <div className="btn"> <i class="bi bi-house"></i> Home </div>
        <div className="btn"><i class="bi bi-search"></i> Search</div>
        <div style={{borderRadius: '100%',}} onClick={logout} className="btn btn-dark border"> <i className="bi bi-box-arrow-right"></i></div>
      </div>
    </div>
  );
};

export default Header;
