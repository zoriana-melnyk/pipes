import { useEffect, useState } from 'react';
import Skeleton from '../HOC/skeleton';
import { Spinner, TextInput } from 'flowbite-react';
import { ProductCard } from '../components';

const SearchContainer = () => {
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
      <div className="m-4">
        <h1>Search Products</h1>
        <TextInput
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for products..."
        />
      </div>
      <div className="grid m-6 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {producs.length ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              title={product.name}
              text={product.description}
              image={`http://localhost:3000/${product.imageSrc}`}
              price={`${product.price} ${product.currency}`}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </Skeleton>
  );
};

export { SearchContainer };
