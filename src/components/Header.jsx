import React, { useEffect, useState } from "react";
import HighlightIcon from '@mui/icons-material/Highlight';


function Header({ onLogout, isAuthenticated ,username}) {
  const [hover, setHover] = useState(false);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5ba13",
    position: "relative",
  };

  const leftContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    margin: 0,
  };

  const usernameStyle = {
    fontFamily: "inherit",
    color: "white",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "18px",
  };

  const logoutButtonStyle = {
    backgroundColor: hover ? "#946d00" : "#f5c94e", // Change color on hover
    border : "none",
    borderRadius: "20px",
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    position: "absolute",
    right: "20px",
    transition: "background-color 0.3s", // Smooth transition

  };

  return (
    <header style={headerStyle}>
      <div style={leftContainerStyle}>
        <h1 style={titleStyle}>
          <HighlightIcon />
          Keeper
        </h1>
        {isAuthenticated ? <p style={usernameStyle}>Welcome, {username}</p> : null}
      </div>
      {isAuthenticated ?
        <button
          style={logoutButtonStyle}
          onClick={onLogout}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >Logout</button> : null}
    </header>
  );
}

export default Header;
