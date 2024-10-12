import React, { useEffect, useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';
import distribucionService from '../services/distribucionService/page';
import DistribucionChart from './DistribucionChart';
import Loader from './Loader';

function GaltonBoardDetails({ id }) {
    const [galtonBoard, setGaltonBoard] = useState(null);
    const [distribucion, setDistribucion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDetails() {
            try {
                const boardData = await galtonBoardService.fetchGaltonBoardById(id);
                setGaltonBoard(boardData);

                if (boardData.estado === 'FINALIZADA' && boardData.distribucionId) {
                    const distribucionData = await distribucionService.fetchDistribucionById(boardData.distribucionId);
                    setDistribucion(distribucionData);
                }
            } catch (error) {
                console.error('Error fetching Galton Board details:', error);
            } finally {
                setLoading(false);
            }
        }
        loadDetails();
    }, [id]);

    if (loading) return <Loader />;

    if (!galtonBoard) return <p>No se encontró el Galton Board con ID {id}</p>;

    return (
        <div>
            <h2>Detalles del Galton Board {id}</h2>
            <p>Número de Bolas: {galtonBoard.numBolas}</p>
            <p>Número de Contenedores: {galtonBoard.numContenedores}</p>
            <p>Estado: {galtonBoard.estado}</p>
            {galtonBoard.estado === 'FINALIZADA' && distribucion && (
                <DistribucionChart data={distribucion.datos} />
            )}
        </div>
    );
}

export default GaltonBoardDetails;
