import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: null
};

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        changeLocation: (state, action) => {
            state.city = action.payload
        }
    }
});

export const {changeLocation} = locationSlice.actions;
export const selectCity= (state)=> state.location.city
export default locationSlice;