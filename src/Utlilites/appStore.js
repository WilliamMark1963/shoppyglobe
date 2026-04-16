import {configureStore} from '@reduxjs/toolkit'
import cartReducer from "./cartSlice.js"
import searchReducer from'./searchSlice.js'

const appStore = configureStore({
    reducer:{
        cart:cartReducer,
        search: searchReducer
    }
})
export default appStore;