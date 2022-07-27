import { useDispatch, useSelector } from 'react-redux';
import { masterDataApi } from '../api';
import { onLoadMasterData } from '../store';

export const useMasterDataStore = () => {
    const dispatch = useDispatch();

    const { data, isLoading } = useSelector(state => state.masterData );

    const startLoadingMasterData = async() => {
        try {
            const { data } = await masterDataApi.get('masterdata');
            console.log({data},'--------');
            dispatch( onLoadMasterData(data) );
        } catch (error) {
          console.log('Error cargando los datos maestros');
          console.log(error)
        }
    }

    return {
        data,
        isLoading,
        startLoadingMasterData,
    }
}
