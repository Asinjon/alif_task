import {configureStore} from "@reduxjs/toolkit";
import commentsReducer from "../features/commentsSlice.js";

export const store = configureStore({
    reducer: {
        comments: commentsReducer
    }
});