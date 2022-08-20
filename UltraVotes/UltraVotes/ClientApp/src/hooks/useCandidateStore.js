import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';

import { 
    onSelectingCandidate, 
    onUpdatingCandidates, 
    onAddingCandidate, 
    onUpdatingCandidate,
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
                await saveImage(candidate, candidate.avatarPhoto);
                dispatch( onUpdatingCandidate(candidate) );
                return;
            }

            const { data } = await ultraVotesApi.post(`candidates/`, candidate);
            await saveImage(data, candidate.avatarPhoto);
            dispatch( onAddingCandidate(data) );
        } catch (error) {
            console.log(error);
        }
    }
    
    const saveImage = async (candidate, photo) => {
        if (photo) {
            let formData = new FormData();
            formData.append("files", photo);
            
            const { data } = await ultraVotesApi.post(`image/${candidate.candidateId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            candidate.avatar = data;
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
