import React, { useEffect, useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';
import DistribucionTexto from '../components/DistribucionTexto';

function HomePage() {
    const [galtonBoards, setGaltonBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGaltonBoards();
    }, []);

    const fetchGaltonBoards = async () => {
        try {
            const data = await galtonBoardService.fetchGaltonBoards();
            setGaltonBoards(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Galton Boards:', error);
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Bienvenido al Simulador de Galton Boards</h1>
            <div>
                <h2>Distribuciones de Galton Boards</h2>
                {galtonBoards.map((board) => (
                    <div key={board.id}>
                        <DistribucionTexto
                            distribucion={board.distribucionActual}
                            estado={board.estado}
                            id={board.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
