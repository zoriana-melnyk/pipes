import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Spinner } from 'flowbite-react';
import { AppContext } from '../service/AppContext';
import { ADD_PRODUCT } from '../service/contextDispatchTypes';

function Products() {
  const [producs, setProducts] = useState([]);
  const { dispatch } = useContext(AppContext);

  const addToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      const { data } = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
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