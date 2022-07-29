import { useDispatch, useSelector } from 'react-redux';
import { masterVoteApi } from '../api';
import { onLoadMasterVotes, onSavingMasterVotes } from '../store';

export const useMasterVoteStore = () => {
    const dispatch = useDispatch();

    const { votes } = useSelector(state => state.masterVote );

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
            // Creando
            const { data } = await masterVoteApi.post('MasterVote', masterVote );
            dispatch( onSavingMasterVotes(data) );

        } catch (error) {
            console.log(error);
        }
    }

    return {
        votes,

        startLoadingMasterVotes,
        startSavingMasterVotes,
    }
}
