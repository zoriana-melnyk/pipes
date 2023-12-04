import React, { createContext, useReducer } from 'react';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_USER,
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
        selectedProducts: [...state.selectedProducts, action.product],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (product) => product._id !== action.product._id
        ),
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider
      value={{ ...state, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };