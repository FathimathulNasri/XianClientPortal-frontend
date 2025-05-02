import { useState } from 'react';
import axios from '../api/axiosConfig';
import '../css/feedbackform.css'; // Make sure this file exists

const FeedbackForm = () => {
  const [text, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);

  const submitFeedback = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Not authenticated');
      return;
    }

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append('text', text);
    formData.append('rating', rating);
    if (image) formData.append('image', image);

    try {
      await axios.post('/feedback/submit', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Feedback submitted');
      setMessage('');
      setRating(1);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={submitFeedback} encType="multipart/form-data">
      <textarea
        value={text}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your feedback"
        required
      />
      <br />
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Upload image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
