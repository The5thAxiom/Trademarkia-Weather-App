import { useEffect, useState } from 'react';
import useWeatherApi, {
    WeatherDataErrorType,
    WeatherDataType
} from '../../hooks/useWeatherApi';
import './CityWeather.css';

interface CityWeatherProps {
    city: string;
    removeCity: () => void;
}

export default function CityWeather({ city, removeCity }: CityWeatherProps) {
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(
        null
    );
    const [weatherDataError, setWeatherDataError] =
        useState<WeatherDataErrorType | null>(null);

    const { fetchWeatherData } = useWeatherApi();

    useEffect(() => {
        if (city !== null && city !== '') {
            (async () => {
                const { data, error } = await fetchWeatherData(city);
                setWeatherData(data);
                setWeatherDataError(error);
            })();
        }
    }, [city, setWeatherData, setWeatherDataError, fetchWeatherData]);

    return (
        <>
            {weatherDataError && <>Error: {weatherDataError.message}</>}
            {weatherData && (
                <>
                    Weather in {weatherData.location.name},{' '}
                    {weatherData.location.region},{' '}
                    {weatherData.location.country} is:
                    <br />
                    Temperature: {weatherData.current.temp_c} degree C (feels
                    like {weatherData.current.feelslike_c} degree C)
                    <br />
                    Wind Speed: {weatherData.current.wind_kph} kph
                    <br />
                    Humiditiy: {weatherData.current.humidity}
                </>
            )}
            <br />
            <button onClick={removeCity}>Clear</button>
        </>
    );
}
