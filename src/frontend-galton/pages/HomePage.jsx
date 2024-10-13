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
            console.log('GaltonBoards:', data); // Asegurarte de que los datos son correctos

            // Filtrar los GaltonBoards que tienen una distribución con datos
            const galtonBoardsConDatos = data.filter(board => board.distribucionActual && Object.keys(board.distribucionActual).length > 0);

            // Obtener los últimos 7 Galton Boards con datos
            const ultimosSieteGaltonBoards = galtonBoardsConDatos.slice(-6);

            setGaltonBoards(ultimosSieteGaltonBoards);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Galton Boards:', error);
            setLoading(false);
        }
    };

    if (loading) return <p style={styles.loadingText}>Cargando...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Fábrica de Campanas de Gauss</h1>
            <div style={styles.boardsContainer}>
                <h2 style={styles.subtitle}>Distribuciones de Galton Boards</h2>
                {galtonBoards.length === 0 ? (
                    <p style={styles.noData}>No hay Galton Boards con datos disponibles.</p>
                ) : (
                    galtonBoards.map((board) => (
                        <div style={styles.boardCard} key={board.id}>
                            <GaltonBoard galtonBoard={board} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Estilos integrados (inline CSS)
const styles = {
    container: {
        width: '80%',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: '20px',
        marginBottom: '20px',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#7f8c8d',
    },
    noData: {
        textAlign: 'center',
        color: '#e74c3c',
        fontSize: '18px',
        marginTop: '40px',
    },
    boardsContainer: {
        display: 'flex',
        flexDirection: 'column',  // Cambiamos el layout a columna para que estén uno debajo del otro
        gap: '20px',
    },
    boardCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
    },
};

// Hover effects for board cards
const boardCardHoverEffect = (event) => {
    event.currentTarget.style.transform = 'scale(1.02)';
};

const boardCardHoverOutEffect = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
};

export default HomePage;







