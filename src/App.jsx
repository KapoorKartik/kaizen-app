import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashbord } from "./components/Dashbord";
import { Kaizen } from "./components/Kaizen";
import { Login } from "./components/Login";
import { Nav } from "./components/Navigation";

function App() {
  return (
    <div className="App">
      {/* <Kaizen /> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Kaizen />}></Route>
        <Route path="/dashbord" element={<Dashbord />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
