import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { useMasterDataStore } from '../hooks';
import { VotesPage, SummaryVotePage, NewVotesPage, UpdateVotePage, UsersVotesPage } from '../votes';

export const AppRouter = () => {

    const { startLoadingMasterData, isLoading } = useMasterDataStore();

    useEffect(() => {
        startLoadingMasterData();
    }, [])

    const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    if (!isLoading) {
        return <p>Loading...</p>
    }

    return (

        <Routes>
            {/* {
                ( authStatus === 'not-authenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <CalendarPage /> } />
            } */}
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="votaciones/nueva" element={ <NewVotesPage /> } />
            <Route path="votaciones/resumen/:id" element={ <SummaryVotePage /> } />
            <Route path="votaciones/detalle/:id" element={ <UpdateVotePage /> } />
            <Route path="votaciones/usuarios/:id" element={ <UsersVotesPage /> } />
            <Route path="*" element={<VotesPage />} />
            {/* <Route path="/*" element={ <Navigate to="/auth/Login" /> } /> */}
        </Routes>
    )
}