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
    }
});


// Action creators are generated for each case reducer function
export const { onLoadMasterVotes } = masterVoteSlice.actions;