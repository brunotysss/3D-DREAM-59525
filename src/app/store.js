import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../feactures/shop/shopSlice'
import  { shopApi } from '../services/shopServices'
import cartReducer from '../feactures/cart/cartSilce'
import { receiptApi } from '../services/receiptsService'
import { authApi } from '../services/AuthService'
import authReducer from '../feactures/auth/authSilce'

export const store = configureStore({
  reducer: {  
    shopReducer,
    cartReducer,
    authReducer,
    [shopApi.reducerPath] : shopApi.reducer,
    [receiptApi.reducerPath] : receiptApi.reducer,
    [authApi.reducerPath] : authApi.reducer,

   },
   middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(shopApi.middleware).concat(receiptApi.middleware).concat(authApi.middleware)
});
