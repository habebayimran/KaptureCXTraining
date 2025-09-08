import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/stories");
        setStories(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchStories();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="story d-flex">
      {stories.length > 0 ? (
        stories.map(({ id, user }) => (
          <div
            key={id}
            className="mx-1"
            onClick={() => navigate(`/stories/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="gradient-border">
              <img
                src={user.profile_pic}
                alt="story"
                className="story-dp rounded-circle"
              />
            </div>
            <p className="text-truncate" style={{ width: "50px" }}>
              {user.username}
            </p>
          </div>
        ))
      ) : (
        <p>No stories available</p>
      )}
    </div>
  );
};

export default Stories;
