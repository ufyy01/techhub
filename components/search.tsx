'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { Input } from './ui/input';
import { useState } from 'react';

const Search = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="relative grow h-2/5 mr-2">
      {showInput && <Input className="h-full" />}
      <div
        className="max-w-fit bg-black p-2 rounded-full absolute right-1 top-0.5"
        onClick={() => setShowInput(!showInput)}
      >
        <Icon
          icon="ic:round-search"
          style={{ fontSize: '20px', color: 'white' }}
        />
      </div>
    </div>
  );
};

export default Search;
