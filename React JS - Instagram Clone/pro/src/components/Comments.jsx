import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../Context";

const Comments = ({ postId }) => {
  const { profile, comments, setComments } = useAppContext();
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const postComments = comments.filter(comment => comment.postId === postId);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const newComment = {
      postId,
      user: {
        id: profile.id,
        username: profile.username,
        profile_pic: profile.profile_pic
      },
      text: commentText,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await axios.post("http://localhost:3001/comments", newComment);
      setComments(prev => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      setError("Failed to add comment");
      console.error(err);
    }
  };

  return (
    <div className="px-3 pb-3">
      {postComments.map(({ id, user, text, timestamp }) => (
        <div key={id} className="d-flex align-items-start my-2">
          <img
            src={user.profile_pic}
            alt={user.username}
            className="rounded-circle me-2"
            style={{ width: "30px", height: "30px", objectFit: "cover" }}
          />
          <div>
            <strong>{user.username}</strong> {text}
            <div style={{ fontSize: "10px", color: "#777" }}>{new Date(timestamp).toLocaleString()}</div>
          </div>
        </div>
      ))}
      <div className="d-flex mt-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="form-control"
        />
        <button onClick={handleAddComment} className="btn btn-primary ms-2">
          Post
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Comments;
