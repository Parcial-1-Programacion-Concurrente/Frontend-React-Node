import React, { useEffect, useState } from 'react';
import distribucionService from '../services/distribucionService/page';
import Loader from './Loader';

export default function DistribucionList() {
    const [distribuciones, setDistribuciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadDistribuciones() {
            try {
                const data = await distribucionService.fetchDistribuciones();
                setDistribuciones(data);
            } catch (error) {
                setError('Error fetching distributions');
            } finally {
                setLoading(false);
            }
        }
        loadDistribuciones();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Distribuciones</h2>
            <ul>
                {distribuciones.map(distribucion => (
                    <li key={distribucion.id}>
                        Distribución ID: {distribucion.id}, {distribucion.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
}
