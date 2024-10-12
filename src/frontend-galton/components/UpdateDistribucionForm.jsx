import React, { useState } from 'react';
import distribucionService from '../services/distribucionService/page';

export default function UpdateDistribucionForm({ id }) {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await distribucionService.updateDistribucion(id, { nombre });
            setSuccess('Distribución actualizada con éxito');
        } catch (error) {
            setError('Error actualizando la distribución');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre de la Distribución"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <button type="submit">Actualizar Distribución</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}

