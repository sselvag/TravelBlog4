import { useLocation } from "react-router";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import "./home.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  fetchPosts();
}, [search]);

  return (
    <>
      <Header/>
      <div className="home">
        <Posts posts={posts}/>
      </div>
    </>
  );
}
