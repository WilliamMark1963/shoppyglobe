import { useEffect, useState } from "react";

const useFetch = (API) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Prevent execution if API is empty
        if (!API) return;

        const getData = async () => {
            setLoading(true);
            setError(null); // Reset error state before a new fetch
            
            try {
                const res = await fetch(API);
                
                // Error checking: check if response is NOT okay
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [API]);

    // Return the values so the component can use them
    return { data, isLoading, error };
};

export default useFetch;