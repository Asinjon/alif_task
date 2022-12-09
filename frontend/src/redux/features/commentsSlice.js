import {createSlice} from "@reduxjs/toolkit";

const defaultValue = {
    data: []
};
const comments = createSlice({
    name: "comments",
    initialState: defaultValue,
    reducers: {
        addComment: (state, action) => {
            console.log("action.payload", action.payload);
            state.data.push(...action.payload);
        }
    } 
});

export const {addComment} = comments.actions;

export default comments.reducer;