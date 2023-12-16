import React, { createContext, useReducer } from 'react';
import {
  ADD_PRODUCT,
  PRODUCT_AMOUNT_CHANGE,
  REMOVE_PRODUCT,
  REMOVE_USER,
  UPDATE_USER_CART,
  SET_USER,
} from './contextDispatchTypes';

const initialState = {
  selectedProducts: [],
  user: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        selectedProducts: [
          ...state.selectedProducts,
          { ...action.product, amount: 1, totalPrice: action.product.price },
        ],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (product) => product._id !== action.product._id
        ),
      };

    // TODO: become to compecated to understand, have to be refactored
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        selectedProducts:
          action.payload?.cart?.items.map((item) => ({
            ...item.product,
            amount: item.amount,
            totalPrice: item.amount * item?.product?.price,
          })) || [],
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    case PRODUCT_AMOUNT_CHANGE:
      return {
        ...state,
        selectedProducts: state.selectedProducts.map((product) => {
          if (product._id === action.payload._id) {
            return {
              ...product,
              amount: action.payload.amount,
              totalPrice: action.payload.amount * product.price,
            };
          }
          return product;
        }),
      };

    case UPDATE_USER_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: action.payload,
        },
      };
    default:
      return state;
  }
}
const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
