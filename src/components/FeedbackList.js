import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import '../css/feedbacklist.css'; // Optional styling

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Not authenticated');
        return;
      }

      try {
        const res = await axios.get('api/feedback/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch feedbacks');
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-list">
      <h2>Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((f, idx) => (
          <div key={idx} className="feedback-card">
            <p><strong>User:</strong> {f.user}</p>
            <p><strong>Message:</strong> {f.text}</p>
            <p><strong>Rating:</strong> {f.rating || 'N/A'}</p>
            {f.image && (
              <img
                src={`http://localhost:5000/uploads/${f.image}`}
                alt="feedback"
                className="feedback-image"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
