'use client';

import { useContext } from 'react';
import { AppContext } from '../service/AppContext';
import { ProductCard } from '../components';
import { REMOVE_PRODUCT } from '../service/contextDispatchTypes';

function CartContainer() {
  const { selectedProducts, dispatch } = useContext(AppContext);

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product });
  };

  return (
    <div className="m-10">
      {selectedProducts.length ? (
        selectedProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              actions={{ removeFromCart }}
            />
          );
        })
      ) : (
        <h1>Кошик пустий</h1>
      )}
    </div>
  );
}

export { CartContainer };
