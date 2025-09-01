import React from 'react';
// import { Header } from '../components/header';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    // Main content of the home page
    <div style={{ padding: '2rem' }}>
      <Button variant="primary">
        <Link to="/login">Login</Link>
      </Button>
      <h1>Welcome to the International Cargo Shipping Platform</h1>
      <p>
        Manage your shipments, track cargo, and connect with global logistics
        partners all in one place.
      </p>
      <ul>
        <li>Book new shipments</li>
        <li>Track existing cargo</li>
        <li>View shipment history</li>
        <li>Contact support</li>
      </ul>
    </div>
  );
};

export default HomePage;
