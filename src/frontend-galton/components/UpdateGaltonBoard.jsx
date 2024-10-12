import React, { useState } from 'react';
import galtonBoardService from '../services/galtonBoardService/page';

export default function UpdateGaltonBoardForm({ id }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await galtonBoardService.updateGaltonBoard(id, { name });
            setSuccess('Galton Board updated successfully');
        } catch (error) {
            setError('Error updating Galton Board');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Galton Board Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Update</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}
