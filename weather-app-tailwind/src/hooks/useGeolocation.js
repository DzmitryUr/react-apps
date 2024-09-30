import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const successHandler = (e) => {
      setLoading(false);
      setError(null);
      setData(e.coords);
    };
    const errorHandler = (e) => {
      setError(e);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return { loading, error, data };
}
