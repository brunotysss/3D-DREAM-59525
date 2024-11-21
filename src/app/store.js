import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../feactures/shop/shopSlice'
import  { shopApi } from '../services/shopServices'
import cartReducer from '../feactures/cart/cartSilce'
import { receiptApi } from '../services/receiptsService'
import { authApi } from '../services/AuthService'
import authReducer from '../feactures/auth/authSilce'
import { reviewApi } from "../services/reviewService";
import reviewReducer from "../feactures/review/reviewSlice"; // Importamos el reviewSlice
export const store = configureStore({
  reducer: {  
    shopReducer,
    cartReducer,
    authReducer,
    reviewReducer,
    [shopApi.reducerPath] : shopApi.reducer,
    [receiptApi.reducerPath] : receiptApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer, // API para manejar reseñas

   },
   middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(shopApi.middleware).concat(receiptApi.middleware).concat(authApi.middleware).concat(reviewApi.middleware)
});
