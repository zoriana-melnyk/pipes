'use client';
import React, { useState } from 'react';
import Skeleton from '../HOC/skeleton';
import { ProductCard } from '../components';
import { TextInput } from 'flowbite-react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Skeleton>
      <div>
        <h1>Search Products</h1>
        <TextInput
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for products..."
        />
      </div>
      <div className="grid my-6 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {Array(5)
          .fill()
          .map((_, index) => (
            <ProductCard key={index} />
          ))}
      </div>
    </Skeleton>
  );
};

export default SearchPage;
