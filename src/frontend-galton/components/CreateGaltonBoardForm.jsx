import React, { useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';

function CreateGaltonBoardForm({ onCreated }) {
    const [numBolas, setNumBolas] = useState(500);
    const [numContenedores, setNumContenedores] = useState(12);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const newGaltonBoard = {
                numBolas,
                numContenedores,
            };
            const createdGaltonBoard = await galtonBoardService.createGaltonBoard(newGaltonBoard);
            onCreated(createdGaltonBoard);
        } catch (error) {
            console.error('Error creating Galton Board:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Crear Nuevo Galton Board</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Número de Bolas:
                    <input type="number" value={numBolas} onChange={e => setNumBolas(parseInt(e.target.value))} min="1" required />
                </label>
                <br />
                <label>
                    Número de Contenedores:
                    <input type="number" value={numContenedores} onChange={e => setNumContenedores(parseInt(e.target.value))} min="1" required />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Galton Board'}
                </button>
            </form>
        </div>
    );
}

export default CreateGaltonBoardForm;
