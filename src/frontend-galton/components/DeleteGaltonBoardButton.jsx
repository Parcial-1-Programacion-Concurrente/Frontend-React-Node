import React, { useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';

function DeleteGaltonBoardButton({ id, onDelete }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de eliminar el Galton Board ${id}?`)) return;
        setLoading(true);
        try {
            await galtonBoardService.deleteGaltonBoard(id);
            onDelete();
        } catch (error) {
            console.error('Error deleting Galton Board:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
    );
}

export default DeleteGaltonBoardButton;
