import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { Navbar } from './ui';
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { LoginPage, loginRequest } from './auth';

// function ProfileContent() {
//     const { instance, accounts, inProgress } = useMsal();
//     const [accessToken, setAccessToken] = useState(null);

//     const name = accounts[0] && accounts[0].name;

//     function RequestAccessToken() {
//         const request = {
//             ...loginRequest,
//             account: accounts[0]
//         };

//         // Silently acquires an access token which is then attached to a request for Microsoft Graph data
//         instance.acquireTokenSilent(request).then((response) => {
//             console.log(response);
//             setAccessToken(response.accessToken);
//             localStorage.setItem('token', response.accessToken);
//         }).catch((e) => {
//             instance.acquireTokenPopup(request).then((response) => {
//                 setAccessToken(response.accessToken);
//             });
//         });
//     }

//     return (
//         <>
//             <h5 className="card-title">Welcome {name}</h5>
//             {accessToken ? 
//                 <p>Access Token Acquired!</p>
//                 :
//                 <button 
//                     className="btn btn-secondary" 
//                     onClick={RequestAccessToken}
//                 >Request Access Token</button>
//             }
//             <button 
//                     className="btn btn-primary" 
//                     onClick={RequestAccessToken}> Second</button>
//         </>
//     );
// };

export const UltraVotesApp = () => {
    const isAuthenticated = useIsAuthenticated();

    const populateWeatherData = async () => {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        populateWeatherData();
    }, [])

    return (
        <Provider store={ store }>
            
            <AuthenticatedTemplate>
                {/* <ProfileContent /> */}
                <Navbar />
                <AppRouter />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
            
        </Provider>
    )
  
}
