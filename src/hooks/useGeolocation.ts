import { useState } from 'react';

export default function useGeolocation() {
    const [location, setLocation] = useState<GeolocationPosition>();
    const [locationError, setLocationError] =
        useState<GeolocationPositionError>();
    navigator.geolocation.getCurrentPosition(
        pos => setLocation(pos),
        err => setLocationError(err)
    );
    return { location, locationError };
}
