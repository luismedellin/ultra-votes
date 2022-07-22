import { configureStore } from "@reduxjs/toolkit";
import { masterVoteSlice } from "./masterVote/masterVoteSlice";

export const store = configureStore({
    reducer: {
        masterVote: masterVoteSlice.reducer
    }
})