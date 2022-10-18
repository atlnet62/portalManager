import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfos: null,
        isLogged: false,
    },
    reducers: {
        signin(state, action) {
            state.userInfos = action.payload;
            state.isLogged = true;
        },
        signout(state) {
            state.userInfos = null;
            state.isLogged = false;
        },
    },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
