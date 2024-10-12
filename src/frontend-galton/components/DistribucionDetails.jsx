import React, { useEffect, useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';
import DistribucionProgress from './DistribucionProgress';
import Loader from './Loader';

function GaltonBoardDetails({ id }) {
    const [galtonBoard, setGaltonBoard] = useState(null);
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
                    // Continuar obteniendo actualizaciones
                    intervalId = setTimeout(fetchStatus, 2000); // Cada 2 segundos
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
            <DistribucionProgress
                distribucion={status.distribucionActual}
                totalBolas={status.totalBolas}
            />
        </div>
    );
}

export default GaltonBoardDetails;


