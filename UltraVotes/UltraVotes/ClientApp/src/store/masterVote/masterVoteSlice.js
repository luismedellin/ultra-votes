import { createSlice } from '@reduxjs/toolkit';

export const masterVoteSlice = createSlice({
    name: 'masterVote',
    initialState: {
        votes: [],
        activeVote: null,
        candidates: []
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
        },
        onUpdatingCandidates: (state, { payload }) => {
            state.candidates = payload;
        },
        onSavingCandidate: (state, { payload }) => {
            state.candidates.push(payload);
        },
        onDeletingCandidate: (state, { payload }) => {
            state.candidates = state.candidates.filter((candidate)=> candidate.candidateId !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onLoadMasterVotes,
    onSavingMasterVotes,
    onSetActiveMasterVote,
    onUpdateMasterVote,
    onSavingCandidate,
    onUpdatingCandidates,
    onDeletingCandidate
} = masterVoteSlice.actions;