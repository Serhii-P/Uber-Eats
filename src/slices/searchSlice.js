import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ''
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchValues: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {searchValues} = searchSlice.actions;
export default searchSlice;