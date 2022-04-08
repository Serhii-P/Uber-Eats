import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    time: 0
}

const deliveryTimeSlice = createSlice({
    name: "deliveryTime",
    initialState,
    reducers: {
        selectDeliveryTime: (state, action) => {
            state.time = action.payload
        }
    }
});

export const {selectDeliveryTime} = deliveryTimeSlice.actions;
export default deliveryTimeSlice;