import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { VotesPage } from '../votes/pages/VotesPage';



export const AppRouter = () => {

    const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';


    return (
        <Routes>
            {/* {
                ( authStatus === 'not-authenticated')  
                    ? <Route path="/auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <CalendarPage /> } />
            } */}
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="/*" element={ <VotesPage /> } />
            {/* <Route path="/*" element={ <Navigate to="/auth/Login" /> } /> */}
        </Routes>
    )
}