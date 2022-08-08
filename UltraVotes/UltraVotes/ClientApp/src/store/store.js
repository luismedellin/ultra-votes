import { configureStore } from "@reduxjs/toolkit";
import { authSlice, masterDataSlice, masterVoteSlice, myVotesSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        masterData: masterDataSlice.reducer,
        masterVote: masterVoteSlice.reducer,
        myVotes: myVotesSlice.reducer,
    }
})