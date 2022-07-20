import { useEffect } from 'react';
import { AppRouter } from './router/AppRouter';
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
        <>
            <Navbar />
            <AppRouter />
        </>
    )
  
}
