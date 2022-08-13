import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';
import 
{ 
    onLoadMasterVotes,
    onAddingCandidate,
    onUpdatingCandidate,
    onSetActiveMasterVote
} from '../store';

export const useMasterVoteStore = () => {
    const dispatch = useDispatch();

    const { votes, activeVote } = useSelector(state => state.masterVote );

    const startLoadingMasterVotes = async() => {
        try {
            const { data } = await ultraVotesApi.get('MasterVote/getall');
            dispatch( onLoadMasterVotes(data) );
        } catch (error) {
          console.log('Error cargando las votaciones');
          console.log(error)
        }
    }

    const startSavingMasterVotes = async( masterVote ) => {
        
        try {
            if(masterVote.masterVoteId) {
                const { data } = await ultraVotesApi.put('MasterVote',masterVote );
                dispatch( onUpdatingCandidate(data) );
                return;
            }

            const { data } = await ultraVotesApi.post('MasterVote', masterVote );
            dispatch( onAddingCandidate(data) );

        } catch (error) {
            console.log(error);
        }
    }

    const getDefaultMasterVote = async( masterVoteId ) => {
        
        try {

            if(!activeVote) {
                const { data: masterVote } = await ultraVotesApi.get(`MasterVote/getMasterVote/${masterVoteId}`);
                const { data: users } = await ultraVotesApi.get(`MasterVote/users/${masterVoteId}`);
                masterVote['users'] = users;

                dispatch( onSetActiveMasterVote(masterVote) );
                
                return masterVote;
            }

            return activeVote;

        } catch (error) {
            console.log(error);
        }
    }

    return {
        votes,

        startLoadingMasterVotes,
        startSavingMasterVotes,
        getDefaultMasterVote
    }
}
