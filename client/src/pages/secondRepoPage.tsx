// This file will serve as the React component for the second repository's webpage.

import React from 'react';
import './secondRepoPage.css'; // Adjusted file path for CSS

const SecondRepoPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:8080" // Updated to the correct port
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Second Repository Page"
      ></iframe>
    </div>
  );
};

export default SecondRepoPage;