import { createSlice } from '@reduxjs/toolkit';

export const masterVoteSlice = createSlice({
    name: 'masterVote',
    initialState: {
        votes: [],
        activeVote: null,
        candidates: [],
        currentCandidate: null
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
        onSelectingCandidate: (state, { payload }) => {
            state.currentCandidate = payload;
        },
        onUpdatingCandidates: (state, { payload }) => {
            state.candidates = payload;
        },
        onAddingCandidate: (state, { payload }) => {
            state.currentCandidate = payload;
            state.candidates.push(payload);
        },
        onUpdatingCandidate: (state, { payload }) => {
            state.currentCandidate = payload;
            state.candidates = state.candidates.map( candidate => {
                if ( candidate.candidateId === payload.candidateId ) {
                    return payload;
                }

                return candidate;
            });
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

    onSelectingCandidate,
    onAddingCandidate,
    onUpdatingCandidate,
    onUpdatingCandidates,
    onDeletingCandidate
} = masterVoteSlice.actions;