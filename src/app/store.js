import { configureStore } from '@reduxjs/toolkit'
import { shopSlice } from '../feactures/shop/shopSlice'



export const store = configureStore({
  reducer: {shopSlice}
})