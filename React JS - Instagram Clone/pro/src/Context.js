import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3001/profile");
      setProfile(res.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/posts");
      setPosts(res.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/comments");
      setComments(res.data);
    } catch (err) {
      setError(err);
    }
  };


  useEffect(() => {
    fetchProfile();
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <AppContext.Provider value={{
      profile,
      posts,
      setPosts,
      comments,
      setComments,
      error
    }}>
      {children}
    </AppContext.Provider>
  );
};
