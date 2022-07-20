import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { Votes } from '../votes/pages/Votes';


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
            <Route path="/*" element={ <Votes /> } />
            {/* <Route path="/*" element={ <Navigate to="/auth/Login" /> } /> */}
        </Routes>
    )
}