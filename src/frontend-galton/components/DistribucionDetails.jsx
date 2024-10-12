import React, { useEffect, useState } from 'react';
import distribucionService from '../services/distribucionService/page';
import Loader from './Loader';

export default function DistribucionDetails({ id }) {
    const [distribucion, setDistribucion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadDistribucion() {
            try {
                const data = await distribucionService.fetchDistribucionById(id);
                setDistribucion(data);
            } catch (error) {
                setError('Error fetching distribution');
            } finally {
                setLoading(false);
            }
        }
        loadDistribucion();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h3>Distribución ID: {id}</h3>
            <p>{JSON.stringify(distribucion)}</p>
        </div>
    );
}

