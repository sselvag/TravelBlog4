import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { axiosInstance } from "../../config";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://wanderlustblog-be4280eec6bb.herokuapp.com/images/"

  //Form submission handler
  const handleSubmit = async (e) => {

    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    //Profile picture
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    
    //Update user data
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            
            {/* Profile Picture */}
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img 
                src={file ? URL.createObjectURL(file) : PF+user.profilePic}
                alt="Profile" 
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"/>
              </label>
              <input 
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Username */}
            <label>Username</label>
            <input 
              type="text" 
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email */}
            <label>Email</label>
            <input 
              type="email" 
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <label>Password</label>
            <input 
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Submit Button */}
            <button className="settingsSubmit" type="submit">
              Update
            </button>
            {success && (
              <span 
                style={{ color: "green", textAlign: "center", marginTop: "20px" }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
    </div>
  );
}