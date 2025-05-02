import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import '../css/adminpanel.css';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/feedback/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbacks(res.data);
    };
    fetchFeedback();
  }, []);

  const handleComment = async (id, comment) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `/feedback/comment/${id}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFeedbacks(prev =>
      prev.map(f => (f._id === id ? { ...f, comment } : f))
    );
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbacks(prev => prev.filter(f => f._id !== id));
      alert('✅ Feedback deleted successfully');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete feedback');
    }
  };
  

  const getSuggestedReply = (text) => {
    const lowerText = text.toLowerCase();
  
    if (lowerText.includes('bug') || lowerText.includes('issue') || lowerText.includes('error')) {
      return 'Thank you for reporting the issue. Our team is looking into it.';
    } else if (lowerText.includes('feature') || lowerText.includes('add') || lowerText.includes('improve')) {
      return 'Thanks for the suggestion! We’ve noted it for future updates.';
    } else if (lowerText.includes('slow') || lowerText.includes('performance')) {
      return 'We’re sorry for the inconvenience. We’re working to improve performance.';
    } else if (lowerText.includes('crash') || lowerText.includes('fail')) {
      return 'We apologize for the crash. This will be addressed as a priority.';
    } else if (lowerText.includes('great') || lowerText.includes('good') || lowerText.includes('awesome')) {
      return 'Thanks for your kind words! We’re happy you’re enjoying it.';
    } else if (lowerText.includes('bad') || lowerText.includes('disappointed')) {
      return 'We’re sorry to hear that. Your feedback will help us do better.';
    } else if (lowerText.includes('easy') || lowerText.includes('simple')) {
      return 'Glad to know you found it easy to use. Thank you!';
    } else if (lowerText.includes('difficult') || lowerText.includes('confusing')) {
      return 'Thanks for your feedback. We’ll work on making it more intuitive.';
    } else {
      return 'Thank you for your feedback. It helps us improve our services.';
    }
  };
  

  const sorted = [...feedbacks].sort((a, b) =>
    sortOrder === 'desc'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  const filtered = filter
    ? sorted.filter(f => String(f.rating) === filter)
    : sorted;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <label>
        Filter by rating:
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label>
        Sort by date:
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </label>

      {filtered.map((f, idx) => (
        <div className="feedback-card" key={f._id}>
        <div className="feedback-header">
          <p><strong>User:</strong> {f.user}</p>
          <p><strong>Date:</strong> {new Date(f.createdAt).toLocaleString()}</p>
        </div>
      
        <div className="feedback-body">
          <p><strong>Rating:</strong> ⭐ {f.rating} / 5</p>
          <p><strong>Message:</strong> {f.text}</p>
      
          {f.image && (
            <div className="feedback-image">
              <img
                src={`http://localhost:5000/uploads/${f.image}`}
                alt="Feedback Attachment"
                style={{ width: '200px', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>
      
        {f.comment && (
          <div className="admin-comment">
            <strong>Admin Reply:</strong>
            <p>{f.comment}</p>
          </div>
        )}
      
        <div className="admin-actions">
          <textarea
            className="comment-box"
            placeholder="Write a reply to this feedback..."
            onBlur={(e) => handleComment(f._id, e.target.value)}
          />
          <div className="suggestion-hint">
            <p><em>Suggested reply:</em> <span className="suggested-reply">{getSuggestedReply(f.text)}</span></p>
          </div>
          <button onClick={() => handleDelete(f._id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default AdminPanel;
