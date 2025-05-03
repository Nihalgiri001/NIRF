import React from 'react';

const NirfFinderExplorerPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:8081" // Points to the nirf-finder-explorer project
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="NIRF Finder Explorer Page"
      ></iframe>
    </div>
  );
};

export default NirfFinderExplorerPage;