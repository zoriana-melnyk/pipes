import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Spinner, Pagination } from 'flowbite-react';
import { AppContext } from '../service/AppContext';
import { ADD_PRODUCT, REMOVE_PRODUCT } from '../service/contextDispatchTypes';

function Products() {
  const perPage = 10;
  const [producs, setProducts] = useState({
    list: [],
    initialList: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch, selectedProducts } = useContext(AppContext);

  const addToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product });
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    setProducts({
      ...producs,
      list: producs.initialList.slice(start, end),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/product');
      const { data } = await response.json();
      setProducts({
        list: data,
        initialList: data,
        totalPages: Math.ceil(data.length / perPage),
      });
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {producs.list.length ? (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {producs.list.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              actions={{ addToCart, removeFromCart }}
              isSelected={selectedProducts.some(
                (selectedProduct) => selectedProduct._id === product._id
              )}
            />
          ))}
        </div>
      ) : (
        <Spinner size="xl" />
      )}

      {producs.totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={producs.totalPages}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}

export { Products };
