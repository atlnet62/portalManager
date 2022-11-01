import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState: {
        myBookmarks: [],
    },
    reducers: {
        loadBookmarks(state, action) {
            state.myBookmarks = [...action.payload];
        }
    },
});
export const { loadBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;