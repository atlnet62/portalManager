import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        myProfile: null,
        isLogged: false,
    },
    reducers: {
        signin(state, action) {
            state.myProfile = action.payload;
            state.isLogged = true;
        },
        signout(state) {
            state.myProfile = null;
            state.isLogged = false;
        },
    },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
