import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.slice";
import bookmarkReducer from "./slices/bookmark.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        myBookmarks: bookmarkReducer,
    },
});

export default store;