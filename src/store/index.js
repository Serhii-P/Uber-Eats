import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { horecaApi } from "../services";
import cartSlice, { getTotals } from "../slices/cartSlice";
import deliveryTimeSlice from "../slices/deliveryTimeSlice";
import locationSlice from "../slices/locationSlice";
import modalSlice from "../slices/modalSlice";
import searchSlice from "../slices/searchSlice";

export const store = configureStore({
    reducer: {
        location: locationSlice.reducer,
        deliveryTime: deliveryTimeSlice.reducer,
        search: searchSlice.reducer,
        modal: modalSlice.reducer,
        cart: cartSlice.reducer,
        [horecaApi.reducerPath]: horecaApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(horecaApi.middleware),
})

setupListeners(store.dispatch);
setupListeners(store.dispatch(getTotals()));