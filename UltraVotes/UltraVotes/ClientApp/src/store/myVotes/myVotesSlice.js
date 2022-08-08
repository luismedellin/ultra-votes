import { createSlice } from '@reduxjs/toolkit';

export const myVotesSlice = createSlice({
    name: 'vote',
    initialState: {
        myVotes: [],
        currentVote: null,
        isLoading: false,
    },
    reducers: {
        onLoadingVotes: (state, { payload }) => {
            state.myVotes = payload;
            state.isLoading = true;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLoadingVotes } = myVotesSlice.actions;