import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { Navbar } from './ui';
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { LoginPage } from './auth';

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
                <Navbar />
                <AppRouter />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <LoginPage />
            </UnauthenticatedTemplate>
            
        </Provider>
    )
  
}
