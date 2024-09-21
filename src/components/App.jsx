import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import LoginRegister from './LoginRegister';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const token1 = getCookie('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])).username;
      setUsername(user);
      setIsAuthenticated(true);
    } else {
      if (token1) {
        localStorage.setItem('token', token1);
        const user = JSON.parse(atob(token1.split('.')[1])).username;
        setUsername(user);
        setIsAuthenticated(true);
        document.cookie = 'token=; Max-Age=0; path=/;';
      }
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
