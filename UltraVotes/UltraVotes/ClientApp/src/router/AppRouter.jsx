import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { useMasterDataStore } from '../hooks';
import { MyVotesPage } from '../my-votes';
import { VotesPage, SummaryVotePage, NewVotesPage, UpdateVotePage, UsersVotesPage } from '../votes';

export const AppRouter = () => {
    
    const { user } = useSelector( state => state.auth );
    const { startLoadingMasterData, isLoading: loadingMasterData } = useMasterDataStore();

    useEffect(() => {
        startLoadingMasterData();
    }, [])    

    if (!loadingMasterData) {
        return <p>Loading...</p>
    }

    return (

        <Routes>
            {/* {
                const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
                ( authStatus === 'not-authenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <CalendarPage /> } />
            } */}
            {/* <Route path="/auth/*" element={ <LoginPage /> } /> */}
            <Route path="votaciones" element={ <VotesPage /> } />
            <Route path="votaciones/nueva" element={ <NewVotesPage /> } />
            <Route path="votaciones/resumen/:id" element={ <SummaryVotePage /> } />
            <Route path="votaciones/detalle/:id" element={ <UpdateVotePage /> } />
            <Route path="votaciones/usuarios/:id" element={ <UsersVotesPage /> } />
            <Route path="*" element={<MyVotesPage />} />
            {/* <Route path="/*" element={ <Navigate to="/auth/Login" /> } /> */}
        </Routes>
    )
}