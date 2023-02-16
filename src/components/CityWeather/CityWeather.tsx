import { useEffect, useState } from 'react';
import useWeatherApi, {
    WeatherDataErrorType,
    WeatherDataType
} from '../../hooks/useWeatherApi';

import * as MaterialDesign from 'react-icons/md';

import './CityWeather.css';

interface CityWeatherProps {
    city: string;
    icon: JSX.Element;
    closeCard: () => void;
}

export default function CityWeather({
    city,
    icon,
    closeCard
}: CityWeatherProps) {
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

    const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
    const [speedUnit, setSpeedUnit] = useState<'kph' | 'mph'>('mph');
    const [precipUnit, setPrecipUnit] = useState<'mm' | 'in'>('mm');

    return (
        <>
            {weatherDataError && (
                <div className='weather-error-card'>
                    Error: {weatherDataError.message}
                    <button onClick={closeCard}>
                        <MaterialDesign.MdClose />
                    </button>
                </div>
            )}
            {weatherData && (
                <div className='weather-card'>
                    <div className='top'>
                        <div className='icon'>{icon}</div>
                        <button
                            className='temp'
                            onClick={() => {
                                tempUnit === 'C'
                                    ? setTempUnit('F')
                                    : setTempUnit('C');
                            }}
                        >
                            {tempUnit === 'C'
                                ? weatherData.current.temp_c
                                : weatherData.current.temp_f}{' '}
                            &deg;{tempUnit}
                        </button>
                        <div className='location'>
                            <div className='name'>
                                {weatherData.location.name}
                            </div>
                            <div className='region'>
                                {weatherData.location.region},{' '}
                                {weatherData.location.country}
                            </div>
                        </div>
                        <button className='close' onClick={closeCard}>
                            <MaterialDesign.MdClose />
                        </button>
                    </div>
                    <div className='info-row'>
                        <div className='feels-like'>
                            <div className='name'>Feels Like</div>
                            <button
                                className='value'
                                onClick={() => {
                                    tempUnit === 'C'
                                        ? setTempUnit('F')
                                        : setTempUnit('C');
                                }}
                            >
                                {tempUnit === 'C'
                                    ? weatherData.current.feelslike_c
                                    : weatherData.current.feelslike_f}{' '}
                                &deg; {tempUnit}
                            </button>
                        </div>
                        <div className='wind-speed'>
                            <div className='name'>Wind Speed</div>
                            <button
                                className='value'
                                onClick={() => {
                                    speedUnit === 'kph'
                                        ? setSpeedUnit('mph')
                                        : setSpeedUnit('kph');
                                }}
                            >
                                {speedUnit === 'kph'
                                    ? weatherData.current.wind_kph
                                    : weatherData.current.wind_mph}{' '}
                                {speedUnit}
                            </button>
                        </div>
                    </div>
                    <div className='info-row'>
                        <div className='feels-like'>
                            <div className='name'>Precipitation</div>
                            <button
                                className='value'
                                onClick={() => {
                                    precipUnit === 'mm'
                                        ? setPrecipUnit('in')
                                        : setPrecipUnit('mm');
                                }}
                            >
                                {precipUnit === 'mm'
                                    ? weatherData.current.precip_mm
                                    : weatherData.current.precip_in}{' '}
                                {precipUnit}
                            </button>
                        </div>
                        <div className='humidity'>
                            <div className='name'>Humidity</div>
                            <button className='value'>
                                {weatherData.current.humidity} %
                            </button>
                        </div>
                    </div>
                    <div></div>
                    {/* <div className='bottom-icons'>
                        <button>
                            <MaterialDesign.MdArrowDropDown />
                        </button>
                        <button>
                            <MaterialDesign.MdTimeline />
                        </button>
                        <button onClick={closeCard}>
                            <MaterialDesign.MdClose />
                        </button>
                    </div> */}
                </div> // card ends
            )}
        </>
    );
}
