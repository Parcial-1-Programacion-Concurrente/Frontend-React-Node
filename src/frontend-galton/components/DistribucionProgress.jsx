import React from 'react';
import styled from 'styled-components';

const DistribucionProgressContainer = styled.div`
  width: 100%;
`;

const ContenedorRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ContenedorName = styled.div`
  width: 80px;
`;

const BarraContainer = styled.div`
  flex-grow: 1;
  background-color: #f0f0f0;
  height: 20px;
  margin: 0 10px;
  position: relative;
`;

const Barra = styled.div`
  background-color: #4caf50;
  height: 100%;
`;

const BolasCount = styled.div`
  width: 50px;
`;

function DistribucionProgress({ distribucion }) {
    const maxBolas = Math.max(...Object.values(distribucion), 1);

    return (
        <DistribucionProgressContainer>
            {Object.entries(distribucion).map(([contenedor, bolas]) => {
                const porcentaje = (bolas / maxBolas) * 100;
                return (
                    <ContenedorRow key={contenedor}>
                        <ContenedorName>{contenedor}</ContenedorName>
                        <BarraContainer>
                            <Barra style={{ width: `${porcentaje}%` }} />
                        </BarraContainer>
                        <BolasCount>({bolas})</BolasCount>
                    </ContenedorRow>
                );
            })}
        </DistribucionProgressContainer>
    );
}

export default DistribucionProgress;
