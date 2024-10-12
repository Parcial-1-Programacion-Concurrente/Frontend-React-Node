import React from 'react';
import GaltonBoardList from '../components/GaltonBoardList';

function HomePage() {
    return (
        <div className="home-page">
            <h1>Bienvenido al Simulador de Galton Boards</h1>
            <GaltonBoardList />
        </div>
    );
}

export default HomePage;
