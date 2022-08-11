import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';

import { onUpdatingCandidates, onDeletingCandidate } from '../store';

export const useCandidateStore = () => {
    const dispatch = useDispatch();

    const { candidates } = useSelector(state => state.masterVote );

    const getCandidates = async( masterVoteId ) => {
        try {
            const {data} = await ultraVotesApi.get(`candidates/${masterVoteId}`);
            dispatch( onUpdatingCandidates(data) );
        } catch (error) {
            console.log(error);
        }
    }

    const onDeleteCandidate = async( candidateId ) => {
        try {
            await ultraVotesApi.delete(`candidates/${candidateId}`);
            dispatch( onDeletingCandidate(candidateId) );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        candidates,

        getCandidates,
        onDeleteCandidate
    }
}
