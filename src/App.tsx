import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import * as MaterialDesign from 'react-icons/md';

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

    const [showLocationWeather, setShowLocationWeather] =
        useState<boolean>(true);
    const [showSearchBox, setShowSearchBox] = useState<boolean>(true);

    return (
        <>
            <h1>Weather App!</h1>
            <div className='icons'>
                <button
                    onClick={() =>
                        showSearchBox
                            ? setShowSearchBox(false)
                            : setShowSearchBox(true)
                    }
                    className={showSearchBox ? 'active' : 'inactive'}
                >
                    <MaterialDesign.MdSearch />
                </button>
                <button
                    onClick={() =>
                        showLocationWeather
                            ? setShowLocationWeather(false)
                            : setShowLocationWeather(true)
                    }
                    className={showLocationWeather ? 'active' : 'inactive'}
                >
                    <MaterialDesign.MdMyLocation />
                </button>
            </div>
            {location && showLocationWeather && (
                <CityWeather
                    icon={<MaterialDesign.MdMyLocation />}
                    city={latLong}
                    closeCard={() => setShowLocationWeather(false)}
                />
            )}
            {showSearchBox && <SearchBox runApiSearch={runApiSearch} />}
            {city !== '' && (
                <CityWeather
                    icon={<MaterialDesign.MdLocationPin />}
                    city={city}
                    closeCard={removeCity}
                />
            )}
        </>
    );
}

