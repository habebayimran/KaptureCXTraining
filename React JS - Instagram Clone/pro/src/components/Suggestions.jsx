import { useEffect, useState } from 'react'
import axios from "axios";


const Suggestions = () => {  
  const[profile, setProfile]=useState(null);
  const[suggestions, setSuggestions]=useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/profile");
        setProfile(res.data);
      } catch (err) {
        setError(err);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get("http://localhost:3001/suggestions");
        setSuggestions(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProfile();
    fetchSuggestions();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="suggestions p-3 position-fixed w-30">

      {profile ? (
        <div className="d-flex align-items-center mb-3">
          <img
            src={profile.profile_pic}
            alt="profile"
            className="dp rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div>
            <h6 className="mb-0">{profile.username}</h6>
            <small className="text-muted">My profile</small>
          </div>
          <small className="ms-auto text-primary fw-bold" style={{ cursor: "pointer" }}>
            Switch
          </small>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="d-flex align-items-center mb-2">
        <small className="text-muted">Suggested for you</small>
        <small className="ms-auto fw-bold" style={{ cursor: "pointer" }}>
          See All
        </small>
      </div>

      {suggestions.length > 0 ? (
        suggestions.map(({ id, profile_pic, username }) => (
          <div key={id} className="d-flex align-items-center my-2">
            <img
              src={profile_pic}
              alt="suggestion"
              className="rounded-circle me-3"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <h6 className="mb-0">{username}</h6>
            <small
              className="ms-auto text-primary fw-bold"
              style={{ cursor: "pointer" }}
            >
              Follow
            </small>
          </div>
        ))
      ) : (
        <p>Loading suggestions...</p>
      )}
    </div>
  )
}

export default Suggestions
