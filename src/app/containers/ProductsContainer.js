import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Spinner, Pagination } from 'flowbite-react';
import { AppContext } from '../service/AppContext';
import { ADD_PRODUCT } from '../service/contextDispatchTypes';

function Products() {
  const [producs, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch, selectedProducts } = useContext(AppContext);

  const addToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  const onPageChange = (page) => setCurrentPage(page);
  const perPage = 8;
  const pagesAmount = Math.ceil(producs.length / perPage);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      const { data } = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {producs.length ? (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {producs.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              actions={{ addToCart }}
              isSelected={selectedProducts.some(
                (selectedProduct) => selectedProduct._id === product._id
              )}
            />
          ))}
        </div>
      ) : (
        <Spinner size="xl" />
      )}

      {producs.length ? (
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}

export { Products };
