import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import CreateArea from "./CreateArea";

const notesRoute = "https://threebdojapi.onrender.com/notes";

function App() {
  return (
    <div>
      <Header />
      <Notes />
      <Footer />
    </div>
  );
}

export default App;
