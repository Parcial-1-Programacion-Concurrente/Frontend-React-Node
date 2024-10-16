import React from 'react';
import { useParams } from 'react-router-dom';
import GaltonBoardDetails from '../components/GaltonBoardDetails';

function GaltonBoardPage() {
    const { id } = useParams();

    return (
        <div>
            <GaltonBoardDetails id={id} />
        </div>
    );
}

export default GaltonBoardPage;
