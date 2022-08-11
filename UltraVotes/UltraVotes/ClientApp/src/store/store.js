import { configureStore } from "@reduxjs/toolkit";
import { authSlice, masterDataSlice, masterVoteSlice, myVotesSlice, uiSlice } from "./";

const globalState = localStorage.getItem('GLOBAL_STATE');
const initialState = globalState ? JSON.parse(globalState) : undefined;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        masterData: masterDataSlice.reducer,
        masterVote: masterVoteSlice.reducer,
        myVotes: myVotesSlice.reducer,
        ui:       uiSlice.reducer,
    }
}, initialState);

export const saveState = () => {
    const state = store.getState();
    localStorage.setItem('GLOBAL_STATE', JSON.stringify(state));
};