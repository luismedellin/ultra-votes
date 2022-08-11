import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';

import { onUpdatingCandidates } from '../store';

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

    return {
        candidates,

        getCandidates
    }
}
