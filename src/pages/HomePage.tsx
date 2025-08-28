import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome to the International Cargo Shipping Platform</h1>
            <p>
                Manage your shipments, track cargo, and connect with global logistics partners all in one place.
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