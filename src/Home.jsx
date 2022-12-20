import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <NavLink to='/login' className="btn btn-primary mx-3">login</NavLink>
      <NavLink to='/register' className="btn btn-success mx-3">register</NavLink>
    </div>
  );
};

export default Home;
