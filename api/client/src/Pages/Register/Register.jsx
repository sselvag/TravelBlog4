import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import { axiosInstance } from "../../config";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError(false);
    try {
      //Send a POST request to the register endpoint
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      //Direct to login page if successfully registered
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  
  return (
    <div className="register">
      {/* Title */}
      <span className="registerTitle">Register</span>
      {/* Form */}
      <form className="registerForm" onSubmit={handleSubmit}>
        {/* Username */}
        <label>Username</label>
        <input 
          type="text" 
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Email */}
        <label>Email</label>
        <input 
          type="text" 
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password */}
        <label>Password</label>
        <input 
          type="password" 
          className="registerInput"
          placeholder="Enter your password..." 
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Register Button */}
        <button className="registerButton" type="submit">Register</button>
      </form>
      {/* Login Button to direct to Login page */}
      <button className="registerLoginButton">
        <Link className="link" to="/login">Login</Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
