import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SearchBox from './components/SearchBox/SearchBox';
import useGeolocation from './hooks/useGeolocation';

export default function App() {
    const [queryParams, setQueryParams] = useSearchParams();
    const [city, setCity] = useState<string>(queryParams.get('city') || '');
    const runApiSearch = (city: string) => {
        queryParams.set('city', city);
        setQueryParams(queryParams);
        setCity(city);
    };
    const removeCity = () => {
        setCity('');
        queryParams.delete('city');
        setQueryParams(queryParams);
    };

    const { location, locationError } = useGeolocation();
    const latLong = location
        ? `${location.coords.latitude},${location.coords.longitude}`
        : '';

    return (
        <>
            <h1>Weather App!</h1>
            {location && (
                <>
                    Current location:
                    <CityWeather city={latLong} />
                </>
            )}
            <SearchBox runApiSearch={runApiSearch} />
            {city !== '' && (
                <>
                    <CityWeather city={city} />
                    <button onClick={removeCity}>Clear</button>
                </>
            )}
        </>
    );
}

