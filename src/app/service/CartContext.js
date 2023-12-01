import React, { createContext, useReducer } from 'react';

const initialState = {
  selectedProducts: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.product],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (product) => product._id !== action.product._id
        ),
      };
    default:
      return state;
  }
}
const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{ selectedProducts: state.selectedProducts, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
