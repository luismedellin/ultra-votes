import { useDispatch, useSelector } from 'react-redux';
import { masterVoteApi } from '../api';
import { onLoadMasterVotes, onSavingMasterVotes, onSetActiveMasterVote, onUpdateMasterVote } from '../store';

export const useMasterVoteStore = () => {
    const dispatch = useDispatch();

    const { votes, activeVote } = useSelector(state => state.masterVote );

    const startLoadingMasterVotes = async() => {
        try {
            const { data } = await masterVoteApi.get('MasterVote/getall');
            dispatch( onLoadMasterVotes(data) );
        } catch (error) {
          console.log('Error cargando las votaciones');
          console.log(error)
        }
    }

    const startSavingMasterVotes = async( masterVote ) => {
        
        try {
            if(masterVote.masterVoteId) {
                await masterVoteApi.put('MasterVote',masterVote );
                dispatch( onUpdateMasterVote(masterVote) );
                return;
            }

            const { data } = await masterVoteApi.post('MasterVote', masterVote );
            dispatch( onSavingMasterVotes(data) );

        } catch (error) {
            console.log(error);
        }
    }

    const getDefaultMasterVote = async( masterVoteId ) => {
        
        try {

            if(!activeVote) {
                const { data } = await masterVoteApi.get(`MasterVote/getMasterVote/${masterVoteId}`);
                console.log(data);
                dispatch( onSetActiveMasterVote(data) );
                return data;
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
