import React, { useEffect, useState } from "react";
import axios from "axios";
import { login } from "./service/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check,setCheck] = useState(false)
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(check);
    apiRegister();
   
  };
  const apiRegister = async () => {
    const { data } = await axios.post(
      "http://go.contact.mmeducare.com/api/v1/login",
      { email, password }
    );
    console.log(data);
    dispatch(login(data));
    if (data?.success) {
      if (check) {
        localStorage.setItem('account',JSON.stringify({email,password}))
      }else{
        localStorage.removeItem("account")
      }  
      nav("/dashboard");
    }
    
  };

  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem('account'))
    if (userAccount) {
      setEmail(userAccount.email)
      setPassword(userAccount.password)
    }
  },[])


   



  return (
    <form onSubmit={handleSubmit} className="col-6">
      <h1>Login account</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="form-control my-5"
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="form-control my-5"
        type="password"
        placeholder="password"
      />

      <div className="flex align-items-center ">
        <input type="checkbox" checked={check} onChange={() => setCheck(prev => !(prev))} />
        <label htmlFor="">Remember Me</label>
      </div>

      <button type="submit" className="btn btn-success">
        Login
      </button>
    </form>
  );
};

export default Login;
