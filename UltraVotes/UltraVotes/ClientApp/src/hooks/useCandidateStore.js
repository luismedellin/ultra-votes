import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';

import { 
    onSelectingCandidate, 
    onUpdatingCandidates, 
    onAddingCandidate, 
    onUpdateMasterVote,
    onDeletingCandidate 
} from '../store';

export const useCandidateStore = () => {
    const dispatch = useDispatch();

    const { currentCandidate, candidates } = useSelector(state => state.masterVote );

    const getCandidates = async( masterVoteId ) => {
        try {
            const {data} = await ultraVotesApi.get(`candidates/${masterVoteId}`);
            dispatch( onUpdatingCandidates(data) );
        } catch (error) {
            console.log(error);
        }
    }

    const selectCandidate = ( candidate ) => {
        dispatch( onSelectingCandidate(candidate));
    }

    const onSavingCandidate = async( candidate ) => {
        try {
            if(candidate.candidateId) {
                await ultraVotesApi.put(`candidates/`, candidate);
                dispatch( onUpdateMasterVote(candidate) );
                return;
            }

            const { data } = await ultraVotesApi.post(`candidates/`, candidate);
            dispatch( onAddingCandidate(data) );
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
        currentCandidate,

        selectCandidate,
        getCandidates,
        onSavingCandidate,
        onDeleteCandidate
    }
}
