import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import galtonBoardService from '../services/galtonBoardService/page';
import Loader from './Loader';
import CreateGaltonBoardForm from './CreateGaltonBoardForm';
import DeleteGaltonBoardButton from './DeleteGaltonBoardButton';

function GaltonBoardList() {
    const [galtonBoards, setGaltonBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadGaltonBoards() {
            try {
                const data = await galtonBoardService.fetchGaltonBoards();
                setGaltonBoards(data);
            } catch (error) {
                console.error('Error fetching Galton Boards:', error);
            } finally {
                setLoading(false);
            }
        }
        loadGaltonBoards();
    }, []);

    const handleCreate = galtonBoard => {
        setGaltonBoards([...galtonBoards, galtonBoard]);
    };

    const handleDelete = id => {
        setGaltonBoards(galtonBoards.filter(board => board.id !== id));
    };

    if (loading) return <Loader />;

    return (
        <div>
            <CreateGaltonBoardForm onCreated={handleCreate} />
            <h2>Galton Boards Disponibles</h2>
            <ul>
                {galtonBoards.map(board => (
                    <li key={board.id}>
                        <Link to={`/galton-board/${board.id}`}>
                            Galton Board {board.id} - Estado: {board.estado}
                        </Link>
                        <DeleteGaltonBoardButton id={board.id} onDelete={() => handleDelete(board.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GaltonBoardList;
