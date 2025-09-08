import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'


const ViewStory = () => {
    const {id} = useParams();
    const navigate=useNavigate();

    const [story, setStory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchStory = async () => {
      try {
        const  { data } = await axios.get(`http://localhost:3001/stories/${id}`);
        setStory(data);
      } catch (e) {
        setError(e);
      }
    };

    fetchStory();
  }, [id]);

  const currentId = Number(id);
  const handlePrev = () => {
    if (currentId === 1) {
      navigate("/");
    } else {
      navigate(`/stories/${currentId - 1}`);
    }
  };
  const handleNext = () => {
    if (currentId === 4) {
      navigate("/");
    } else {
      navigate(`/stories/${currentId + 1}`);
    }
  };

  if (error) return <p>Error: {error.message}</p>;
  if (!story) return <p>No Story...</p>;

  return (
    <div className="d-flex justify-content-center align-items-center position-relative bg-dark" style={{ height: "100vh" }}>
      
      <div className="position-absolute top-0 start-0 d-flex align-items-center justify-content-between w-100 p-2 text-white"
        style={{ background: "rgba(0,0,0,0.4)" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={story.user.profile_pic}
            alt="profile"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <strong>{story.user.username}</strong>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-dark border-0 text-white"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <button
        onClick={handlePrev}
        className="position-absolute start-0 top-50 translate-middle-y p-3 bg-dark bg-opacity-50 rounded-circle text-white border-0"
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
      >
        <FaChevronLeft />
      </button>

      <img
        src={story.image}
        alt="story"
        className="img-fluid"
        style={{ maxHeight: "100vh", borderRadius: "10px" }}
      />

      <button
        onClick={handleNext}
        className="position-absolute end-0 top-50 translate-middle-y p-3 bg-dark bg-opacity-50 rounded-circle text-white border-0"
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
      >
        <FaChevronRight />
      </button>
    </div>
  )
}
export default ViewStory
