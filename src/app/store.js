import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../feactures/shop/shopSlice'
import  { shopApi } from '../services/shopServices'
import cartReducer from '../feactures/cart/cartSilce'
export const store = configureStore({
  reducer: {  
    shopReducer,
    cartReducer,
    [shopApi.reducerPath] : shopApi.reducer,
   },
   middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(shopApi.middleware)
});
