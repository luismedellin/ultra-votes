import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';
import { onLoadingVotes, onSetCurrentVote } from '../store';

export const useMyVotesStore = () => {
    const dispatch = useDispatch();

    const { myVotes, isLoading, currentVote } = useSelector(state => state.myVotes );

    const startLoadingMyVotes = async(user) => {
        try {
            const { data } = await ultraVotesApi.get(`MasterVote/getAll/${user}`);
            dispatch( onLoadingVotes(data) );
        } catch (error) {
          console.log('Error cargando mis votaciones');
          console.log(error)
        }
    }
    
    const getVote = async( masterVoteId, user ) => {
        try {
            const searchedVote = myVotes.find((vote)=> vote.masterVoteId === +masterVoteId);
            const {data: candidates} = await ultraVotesApi.get(`candidates/${masterVoteId}/${user}`);

            const voteDetail = {
                ...searchedVote,
                candidatesToVote: candidates
            };
            
            dispatch( onSetCurrentVote(voteDetail) );
            return voteDetail;

        } catch (error) {
            console.log(error);
        }
    }

    return {
        myVotes,
        isLoading,
        currentVote,
        
        startLoadingMyVotes,
        getVote,
    }
}
