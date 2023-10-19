import "./write.css";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { axiosInstance } from "../../config";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    // const [userMessage, setUserMessage] = useState("");
    const { user } = useContext(Context);

    //Handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        //Create a new Post based on user input
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        //If no cover image is provided
        // if (!file) {
        //     setUserMessage("Please select an image to upload.");
        //     return;
        // } else {
        //     setUserMessage("");
        // }
        
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axiosInstance.post("/upload", data);
            } catch (err) {}
        }
        try {
            const res = await axiosInstance.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {}
    };

  return (
    <div className="write">
        {file && (
            <img className="writeImg" src={URL.createObjectURL(file)} alt='Blog Cover'/>
        )}
        {/* {userMessage && (
            <span className="userMessage">
                {userMessage}
            </span>
        )} */}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                {/* Cover Image Icon*/}
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"/>
                </label>
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{ display: "none" }} 
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                {/* Title */}
                <input 
                    type="text" 
                    placeholder="Title"
                    className="writeInput"
                    autoFocus={true} 
                    onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                {/* Blog Post Area */}
                <textarea 
                    placeholder="Share your story..."
                    // type="text" 
                    className="writeInput writeText"
                    onChange={e=>setDesc(e.target.value)}
                />
            </div>
            {/* Publish Button */}
            <button className="writeSubmit" type="submit">
                Publish
            </button>
        </form>
    </div>
  );
}
