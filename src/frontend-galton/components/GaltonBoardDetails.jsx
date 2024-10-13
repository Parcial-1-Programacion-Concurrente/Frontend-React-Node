import React, { useEffect, useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';
import DistribucionChart from './DistribucionChart';
import Loader from './Loader';

function GaltonBoardDetails({ id }) {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intervalId;

        async function fetchStatus() {
            try {
                const statusData = await galtonBoardService.fetchGaltonBoardStatusById(id);
                setStatus(statusData);
                setLoading(false);

                if (statusData.estado !== 'FINALIZADA') {
                    intervalId = setTimeout(fetchStatus, 2000);
                }
            } catch (error) {
                console.error('Error fetching Galton Board status:', error);
                setLoading(false);
            }
        }

        fetchStatus();

        return () => {
            if (intervalId) clearTimeout(intervalId);
        };
    }, [id]);

    if (loading) return <Loader />;

    if (!status) return <p>No se encontró el Galton Board con ID {id}</p>;

    return (
        <div>
            <h2>Detalles del Galton Board {id}</h2>
            <p>Estado: {status.estado}</p>
            <DistribucionChart distribucion={status.distribucionActual} />
        </div>
    );
}

export default GaltonBoardDetails;

