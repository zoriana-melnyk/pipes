import { useContext, useEffect, useState } from 'react';
import { Label, Spinner, TextInput, Pagination } from 'flowbite-react';
import { ProductCard } from '../components';
import { AppContext } from '../service/AppContext';
import { ADD_PRODUCT, REMOVE_PRODUCT } from '../service/contextDispatchTypes';

const SearchContainer = () => {
  const perPage = 4;
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const [producs, setProducts] = useState({
    list: [],
    initialList: [],
    totalPages: 0,
  });

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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

  const filteredProducts = producs.list.filter((product) => {
    return product.name.toLowerCase().includes(query.toLowerCase());
  });
  const { dispatch, selectedProducts } = useContext(AppContext);

  const addToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product });
  }

  return (
    <>
      <div className="my-4">
        <Label>Пошук продуктів</Label>
        <TextInput
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Введіть назву товару..."
        />
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {producs.list.length ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              actions={{ addToCart, removeFromCart }}
              isSelected={selectedProducts.some(
                (selectedProduct) => selectedProduct._id === product._id
              )}
            />
          ))
        ) : (
          <Spinner size="xl" />
        )}
      </div>

      {producs.totalPages > 1 && !query ? (
        <Pagination
          currentPage={currentPage}
          totalPages={producs.totalPages}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  );
};

export { SearchContainer };
