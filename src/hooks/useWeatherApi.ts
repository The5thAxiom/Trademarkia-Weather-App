export interface WeatherDataType {
    current: {
        cloud: number;
        condition: {
            code: number;
            icon: string;
            text: string;
        };
        feelslike_c: number;
        feelslike_f: number;
        gust_kph: number;
        gust_mph: number;
        humidity: number;
        is_day: number;
        last_updated: string;
        last_updated_epoch: number;
        precip_in: number;
        precip_mm: number;
        pressure_in: number;
        pressure_mb: number;
        temp_c: number;
        temp_f: number;
        uv: number;
        vis_km: number;
        vis_miles: number;
        wind_degree: number;
        wind_dir: string;
        wind_kph: number;
        wind_mph: number;
    };
    location: {
        country: string;
        lat: number;
        localtime: string;
        localtime_epoch: number;
        lon: number;
        name: string;
        region: string;
        tz_id: string;
    };
}

export interface WeatherDataErrorType {
    code: number;
    message: string;
}

const fetchWeatherData = async (city: string) => {
    const apiKey = '8273dab588c441a3984115445231602';
    const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await res.json();
    console.log(data);
    let weatherData: WeatherDataType | null = null;
    let weatherDataError: WeatherDataErrorType | null = null;
    if (!res.ok) {
        weatherDataError = data;
    } else {
        weatherData = data;
    }
    return { data: weatherData, error: weatherDataError };
};

export default function useWeatherApi() {
    return { fetchWeatherData };
}
