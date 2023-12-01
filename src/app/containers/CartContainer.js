'use client';

import { useContext } from 'react';
import { CartContext } from '../service/CartContext';
import { ProductCard } from '../components';

function CartContainer() {
  const { selectedProducts, dispatch } = useContext(CartContext);

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_PRODUCT', product });
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
