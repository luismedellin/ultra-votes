import { configureStore } from "@reduxjs/toolkit";
import { masterDataSlice, masterVoteSlice, myVotesSlice } from "./";

export const store = configureStore({
    reducer: {
        masterData: masterDataSlice.reducer,
        masterVote: masterVoteSlice.reducer,
        myVotes: myVotesSlice.reducer,
    }
})