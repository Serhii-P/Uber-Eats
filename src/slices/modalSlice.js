import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idValue : null,
    isOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        productDetails: (state, action) => {
            state.idValue = action.payload
        },
        openModal: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { productDetails, openModal } = modalSlice.actions;
export default modalSlice;