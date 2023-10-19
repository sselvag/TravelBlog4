import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./navbar.css";



export default function Navbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://wanderlustblog-be4280eec6bb.herokuapp.com/images/";


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const defaultPP = "https://wanderlustblog-be4280eec6bb.herokuapp.com/images/user_1144760.png"

  return (
    <div className="navbar">
      <div className="topLeft">
        <a href="https://www.facebook.com"><i className="topIcon fab fa-facebook-square"/></a>
        <a href="https://www.twitter.com"><i className="topIcon fab fa-twitter-square"/></a>
        <a href="https://www.pinterest.com"><i className="topIcon fab fa-pinterest-square"/></a>
        <a href="https://www.instagram.com"><i className="topIcon fab fa-instagram-square"/></a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/settings">
              {user && "SETTINGS"}
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="Profile"/>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
} 