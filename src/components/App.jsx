import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import LoginRegister from './LoginRegister';

function App() {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("User authenticated, rendering Notes");
      const user = JSON.parse(atob(token.split('.')[1])).username;
      setUsername(user);
      setIsAuthenticated(true);
    } else {
      console.log("User not authenticated, rendering LoginRegister");
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const user = JSON.parse(atob(token.split('.')[1])).username;
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
      {isAuthenticated ? <Notes /> : <LoginRegister onLogin={handleLogin} />}
      <Footer />
    </div>
  );
}

export default App;
