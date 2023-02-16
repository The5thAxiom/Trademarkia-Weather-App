import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SearchBox from './components/SearchBox/SearchBox';

export default function App() {
    const [queryParams] = useSearchParams();
    const [city, setCity] = useState<string>(queryParams.get('city') || '');
    const runApiSearch = (city: string) => {
        console.log(city);
        queryParams.set('city', city);
        setCity(city);
    };
    const removeCity = () => {
        setCity('');
        queryParams.delete('city');
    };

    return (
        <>
            <Navbar />
            <main>
                <h1>Welcome to trademarkia!</h1>
                {city === '' ? (
                    <SearchBox runApiSearch={runApiSearch} />
                ) : (
                    <CityWeather city={city} removeCity={removeCity} />
                )}
            </main>
            <Footer />
        </>
    );
}

