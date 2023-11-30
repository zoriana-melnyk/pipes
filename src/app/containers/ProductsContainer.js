import { useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Spinner } from 'flowbite-react';

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

  return (
    <div className="grid my-6 gap-6 mb-8 mx-10 md:grid-cols-2 xl:grid-cols-4">
      {producs.length ? (
        producs.map((product) => (
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
  );
}

export { Products };
