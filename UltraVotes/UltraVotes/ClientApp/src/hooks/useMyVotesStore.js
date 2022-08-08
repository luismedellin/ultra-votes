import { useDispatch, useSelector } from 'react-redux';
import { ultraVotesApi } from '../api';
import { onLoadingVotes } from '../store';

export const useMyVotesStore = () => {
    const dispatch = useDispatch();

    const { myVotes, isLoading } = useSelector(state => state.myVotes );

    const startLoadingMyVotes = async(user) => {
        try {
            const { data } = await ultraVotesApi.get(`MasterVote/getAll/${user}`);
            dispatch( onLoadingVotes(data) );
        } catch (error) {
          console.log('Error cargando mis votaciones');
          console.log(error)
        }
    }

    return {
        myVotes,
        isLoading,
        
        startLoadingMyVotes,
    }
}
