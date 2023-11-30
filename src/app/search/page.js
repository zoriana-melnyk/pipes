'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from '../HOC/skeleton';
import { ProductCard } from '../components';
import { TextInput } from 'flowbite-react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const [producs, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      const { data } = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const filteredProducts = producs.filter((product) => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });

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
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product._id}
            title={product.name}
            text={product.description}
            image={`http://localhost:3000/${product.imageSrc}`}
            price={`${product.price} ${product.currency}`}
          />
        ))}
      </div>
    </Skeleton>
  );
};

export default SearchPage;
