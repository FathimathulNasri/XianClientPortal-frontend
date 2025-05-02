import FeedbackForm from '../components/FeedbackForm';
import '../css/dashboard.css'; // Create this file

const Dashboard = () => (
  <div className="dashboard-container">
    <h1 className="dashboard-title">Client Dashboard</h1>
    <FeedbackForm />
  </div>
);

export default Dashboard;
