import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./login.css";
import { axiosInstance } from "../../config";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  //Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      //Send login request to server
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      //If login is successful, update conext with user data
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      {/* Title */}
      <span className="loginTitle">Login</span>
      {/* Form */}
      <form className="loginForm" onSubmit={handleSubmit}>
        {/* Username */}
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        {/* Login Button */}
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      {/* Register Button to direct to Register page */}
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
