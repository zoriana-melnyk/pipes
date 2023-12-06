import { useContext, useEffect, useState } from 'react';
import { Label, Spinner, TextInput } from 'flowbite-react';
import { ProductCard } from '../components';
import { AppContext } from '../service/AppContext';
import { ADD_PRODUCT } from '../service/contextDispatchTypes';

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
  const { dispatch, selectedProducts } = useContext(AppContext);

  const addToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  return (
    <>
      <div className="my-4">
        <Label>Search Products</Label>
        <TextInput
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for products..."
        />
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {producs.length ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              actions={{ addToCart }}
              isSelected={selectedProducts.some(
                (selectedProduct) => selectedProduct._id === product._id
              )}
            />
          ))
        ) : (
          <Spinner size="xl" />
        )}
      </div>
    </>
  );
};

export { SearchContainer };
