import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SearchBox from './components/SearchBox/SearchBox';

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

    return (
        <>
            <Navbar />
            <main>
                <h1>Welcome to trademarkia!</h1>
                <SearchBox runApiSearch={runApiSearch} />
                {city !== '' && (
                    <CityWeather city={city} removeCity={removeCity} />
                )}
            </main>
            <Footer />
        </>
    );
}

