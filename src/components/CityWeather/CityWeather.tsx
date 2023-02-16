import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import './CityWeather.css';

interface CityWeatherProps {
    city: string;
    removeCity: () => void;
}

export default function CityWeather({ city, removeCity }: CityWeatherProps) {
    const navigate = useNavigate();
    return (
        <>
            Weather in {city}
            <br />
            <button onClick={removeCity}>back</button>
        </>
    );
}
