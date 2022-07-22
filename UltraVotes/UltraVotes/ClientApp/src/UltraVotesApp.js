import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { Navbar } from './ui';

export const UltraVotesApp = () => {

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
            <Navbar />
            <AppRouter />
        </Provider>
    )
  
}
