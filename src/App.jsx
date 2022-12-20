import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Guard from "./Guard";
import Create from "./Create";
import Edit from "./Edit";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Guard><Dashboard /> </Guard>} />
        <Route path="/create" element={<Guard><Create /> </Guard>} />
        <Route path="/edit/:id" element={<Guard><Edit /> </Guard>} />
      </Routes>
    </div>
  );
};

export default App;
