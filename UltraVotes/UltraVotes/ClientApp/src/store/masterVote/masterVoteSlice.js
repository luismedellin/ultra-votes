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
        onUpdateMasterVote: (state, { payload }) => {
            if(!state.votes.length){
                state.activeVote = payload;
                return;
            }
            
            state.votes = state.votes.map( vote => {
                
                if ( vote.masterVoteId === payload.masterVoteId ) {
                    
                    return payload;
                }

                return vote;
            });
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLoadMasterVotes, onSavingMasterVotes, onSetActiveMasterVote, onUpdateMasterVote } = masterVoteSlice.actions;