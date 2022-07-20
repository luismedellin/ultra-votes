import { useEffect } from 'react';

export const App = () => {

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
            <h1>Ultra Air</h1>
        </>
    )
  
}
