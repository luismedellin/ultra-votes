import { configureStore } from "@reduxjs/toolkit";
import { masterDataSlice } from "./masterData/masterDataSlice";
import { masterVoteSlice } from "./masterVote/masterVoteSlice";

export const store = configureStore({
    reducer: {
        masterData: masterDataSlice.reducer,
        masterVote: masterVoteSlice.reducer,
    }
})