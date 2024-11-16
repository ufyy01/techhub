'use client';
import { Button } from './ui/button';
const ClearFilter = () => {
  const handleClearFilters = () => {
    window.location.href = '/get-hubs';
  };

  return (
    <div>
      <Button onClick={handleClearFilters}>Clear Filter</Button>
    </div>
  );
};

export default ClearFilter;
