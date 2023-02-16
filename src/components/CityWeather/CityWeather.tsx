import { useEffect, useState } from 'react';
import useWeatherApi, {
    WeatherDataErrorType,
    WeatherDataType,
    WeatherForecastDataType,
    LocationDataType
} from '../../hooks/useWeatherApi';

import * as MaterialDesign from 'react-icons/md';

import './CityWeather.css';

interface CityWeatherProps {
    city: string;
    icon: JSX.Element;
    closeCard: () => void;
}

const dateFormat = (ip: string) => {
    const d = Date.parse(ip);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}`;
};

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

    const [weatherForecastData, setWeatherForecastData] = useState<
        WeatherForecastDataType[] | null
    >(null);

    const [location, setLocation] = useState<LocationDataType | null>(null);

    const { fetchWeatherData } = useWeatherApi();

    useEffect(() => {
        if (city !== null && city !== '') {
            (async () => {
                const { location, data, forecast, error } =
                    await fetchWeatherData(city);
                setWeatherData(data);
                setWeatherDataError(error);
                setWeatherForecastData(forecast);
                setLocation(location);
            })();
        }
    }, [city, setWeatherData, setWeatherDataError, fetchWeatherData]);

    const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
    const [speedUnit, setSpeedUnit] = useState<'kph' | 'mph'>('mph');
    const [precipUnit, setPrecipUnit] = useState<'mm' | 'in'>('mm');
    const [visUnit, setVisUnit] = useState<'km' | 'miles'>('km');
    const [pressureUnit, setPressureUnit] = useState<'mb' | 'in'>('mb');

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
            {weatherData && location && weatherForecastData && (
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
                                ? weatherData.temp_c
                                : weatherData.temp_f}{' '}
                            &deg;{tempUnit}
                        </button>
                        <div className='location'>
                            <div className='name'>{location.name}</div>
                            <div className='region'>
                                {location.region}, {location.country}
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
                                    ? weatherData.feelslike_c
                                    : weatherData.feelslike_f}{' '}
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
                                    ? weatherData.wind_kph
                                    : weatherData.wind_mph}{' '}
                                {speedUnit}
                            </button>
                        </div>
                        <div className='visibility'>
                            <div className='name'>Visibility</div>
                            <button
                                className='value'
                                onClick={() => {
                                    visUnit === 'km'
                                        ? setVisUnit('miles')
                                        : setVisUnit('km');
                                }}
                            >
                                {visUnit === 'km'
                                    ? weatherData.vis_km
                                    : weatherData.vis_miles}{' '}
                                {visUnit}
                            </button>
                        </div>
                    </div>
                    <div className='info-row'>
                        <div className='precipitation'>
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
                                    ? weatherData.precip_mm
                                    : weatherData.precip_in}{' '}
                                {precipUnit}
                            </button>
                        </div>
                        <div className='humidity'>
                            <div className='name'>Humidity</div>
                            <button className='value'>
                                {weatherData.humidity} %
                            </button>
                        </div>
                        <div className='pressure'>
                            <div className='name'>Pressure</div>
                            <button
                                className='value'
                                onClick={() => {
                                    pressureUnit === 'mb'
                                        ? setPressureUnit('in')
                                        : setPressureUnit('mb');
                                }}
                            >
                                {pressureUnit === 'mb'
                                    ? weatherData.pressure_mb
                                    : weatherData.pressure_in}{' '}
                                {pressureUnit}
                            </button>
                        </div>
                    </div>
                    <div className='forecast'>
                        {weatherForecastData.map(forecast => (
                            <div key={forecast.date}>
                                <div className='name'>
                                    {dateFormat(forecast.date)}
                                </div>
                                <button
                                    className='value'
                                    onClick={() => {
                                        tempUnit === 'C'
                                            ? setTempUnit('F')
                                            : setTempUnit('C');
                                    }}
                                >
                                    {tempUnit === 'C'
                                        ? forecast.day.avgtemp_c
                                        : forecast.day.avgtemp_f}{' '}
                                    &deg; {tempUnit}
                                </button>
                            </div>
                        ))}
                    </div>
                </div> // card ends
            )}
        </>
    );
}
