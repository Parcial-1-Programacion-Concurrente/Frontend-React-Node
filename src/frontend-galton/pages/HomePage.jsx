import React, { useEffect, useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';
import GaltonBoard from '../components/GaltonBoard'; // Importar el componente GaltonBoard

function HomePage() {
    const [galtonBoards, setGaltonBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGaltonBoards();
    }, []);

    const fetchGaltonBoards = async () => {
        try {
            const data = await galtonBoardService.fetchGaltonBoards();
            console.log(data); // Verificar los datos que llegan del backend
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
                    <GaltonBoard key={board.id} galtonBoard={board} />
                    ))}
            </div>
        </div>
    );
}

export default HomePage;
