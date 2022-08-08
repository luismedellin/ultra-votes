import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useMasterDataStore, useMyVotesStore } from '../hooks';
import { MyVotesPage } from '../my-votes';
import { VotesPage, SummaryVotePage, NewVotesPage, UpdateVotePage, UsersVotesPage } from '../votes';

export const AppRouter = () => {
    
    const { startLoadingMasterData, isLoading: loadingMasterData } = useMasterDataStore();
    const { startLoadingMyVotes, isLoading: loadingMyVotes } = useMyVotesStore();

    useEffect(() => {
        startLoadingMasterData();
        startLoadingMyVotes();
    }, [])    

    if (!loadingMasterData || !loadingMyVotes) {
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