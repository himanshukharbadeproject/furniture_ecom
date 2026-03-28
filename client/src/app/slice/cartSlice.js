import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ()=>{
    const response = await axios.post(`${apiBaseUrl}cart/view-cart`,{},{
      headers: {
        Authorization: `Bearer ${Cookies.get("TOKEN")?? ""}`
      }
    });
    let finalData = await response.data;
    return finalData;
  }
)

const initialState = {
  cart: [],
  imagePath: ""
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartData: (state, reqData)=>{
        let {payload} = reqData
        state.cart.push(payload.cart)
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      state.cart = action.payload.cart ?? [],
      state.imagePath = action.payload.staticImagePath ?? ""
    })
  }
})

// Action creators are generated for each case reducer function
export const {cartData} = cartSlice.actions

export default cartSlice.reducer