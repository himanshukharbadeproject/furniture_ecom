import { configureStore } from '@reduxjs/toolkit'
import  {loginSlice}  from '../slice/userSlice'
import  {cartSlice}  from '../slice/cartSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    cart: cartSlice.reducer
  },
})