import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import * as MaterialDesign from 'react-icons/md';

import SearchBox from './components/SearchBox/SearchBox';
import useGeolocation from './hooks/useGeolocation';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';

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
    const [showSettings, setShowSettings] = useState<boolean>(false);

    return (
        <>
            {showSettings && (
                <SettingsMenu
                    isOpen={showSettings}
                    setIsOpen={setShowSettings}
                />
            )}
            <h1>Forecast Finder</h1>
            {showSearchBox && <SearchBox runApiSearch={runApiSearch} />}
            {city !== '' && (
                <CityWeather
                    icon={<MaterialDesign.MdLocationPin />}
                    city={city}
                    closeCard={removeCity}
                />
            )}
            {location && showLocationWeather && (
                <CityWeather
                    icon={<MaterialDesign.MdMyLocation />}
                    city={latLong}
                    closeCard={() => setShowLocationWeather(false)}
                />
            )}
            <div className='icons'>
                {/* <button
                    onClick={() =>
                        showSearchBox
                            ? setShowSearchBox(false)
                            : setShowSearchBox(true)
                    }
                    className={showSearchBox ? 'active' : 'inactive'}
                >
                    <MaterialDesign.MdSearch />
                </button> */}
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
                <button
                    onClick={() =>
                        showSettings
                            ? setShowSettings(false)
                            : setShowSettings(true)
                    }
                    className={showSettings ? 'active' : 'inactive'}
                >
                    <MaterialDesign.MdSettings />
                </button>
            </div>
        </>
    );
}

