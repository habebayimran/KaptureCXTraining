import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import Comments from "./Comments";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/posts");
        setPosts(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPosts();
  }, []);

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div style={{ maxWidth: "500px", width: "100%" }}>
          {posts.map(({ id, user, image, caption, likes }) => (
            <div
              className="card my-4 shadow-sm border-0"
              key={id}
              style={{ borderRadius: "10px" }}
            >
              <div className="d-flex align-items-center p-2">
                <img
                  src={user.profile_pic}
                  alt="dp"
                  className="dp rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="ms-2">
                  <strong>{user.username}</strong>
                </div>
              </div>

              <img
                src={image}
                alt="post"
                className="card-img-top"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  borderRadius: "0px",
                }}
              />

              <div className="d-flex align-items-center px-3 py-2">
                <button
                  onClick={() => toggleLike(id)}
                  className="btn border-0 bg-transparent p-0 me-3"
                >
                  {likedPosts[id] ? (
                    <FaHeart size={22} color="red" />
                  ) : (
                    <FaRegHeart size={22} />
                  )}
                </button>
                <button 
                  onClick={() => toggleComments(id)}
                  className="btn border-0 bg-transparent p-0"
                >
                  <FaRegComment size={22} />
                </button>
              </div>

              <strong className="px-3">{likes} likes</strong>
              <span className="px-3 pb-2">{caption}</span>

              {showComments[id] && <Comments postId={id} />}
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
