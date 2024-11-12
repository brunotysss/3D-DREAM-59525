import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../feactures/shop/shopSlice';

export const store = configureStore({
  reducer: {  shopReducer },
});
