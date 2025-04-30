import { useState } from 'react';
import { Button, Select } from '../components/ui';

const RankingsFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex justify-between mb-4">
      <Select value={selectedCategory} onChange={handleSelectChange}>
        <option value="All">All</option>
        {/* Add other filter options here */}
      </Select>

      {/* Remove or comment this import button section */}
      {/* <Button onClick={handleImportClick}>Import NIRF Data</Button> */}
    </div>
  );
};

export default RankingsFilter;