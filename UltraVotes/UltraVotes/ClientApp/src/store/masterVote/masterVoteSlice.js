import { createSlice } from '@reduxjs/toolkit';

export const masterVoteSlice = createSlice({
    name: 'masterVote',
    initialState: {
        votes: [],
        activeVote: null
    },
    reducers: {
        onLoadMasterVotes: (state, { payload }) => {
            state.votes = payload;
        },
        onSavingMasterVotes: (state, { payload }) => {
            state.votes.push(payload);
            state.activeVote = payload;
        },
        onSetActiveMasterVote: (state, { payload }) => {
            state.activeVote = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLoadMasterVotes, onSavingMasterVotes, onSetActiveMasterVote } = masterVoteSlice.actions;