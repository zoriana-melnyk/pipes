import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Spinner } from 'flowbite-react';
import { CartContext } from '../service/CartContext';

function Products() {
  const [producs, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      const { data } = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);
  const { dispatch } = useContext(CartContext);
  const addToCart = (product) => {
    dispatch({ type: 'ADD_PRODUCT', product });
  };

  return (
    <div className="grid my-6 gap-6 mb-8 mx-10 md:grid-cols-2 xl:grid-cols-4">
      {producs.length ? (
        producs.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            actions={{ addToCart }}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export { Products };
