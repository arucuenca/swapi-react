import React from 'react';
import { useLocation } from 'react-router-dom';
import Main from './Main';
import { Link } from "react-router-dom";

function NotFound () {
    let rota = useLocation();
    let error = (
        <div>
            <h1>Rota: <code>{rota.pathname}</code> não encontrada!</h1>
            <h2>
                Tente recalibrar o sistema de navegação de sua nave e se precisar de ajuda,
                <Link to="/" render={<Main />}> clique aqui!</Link>
            </h2>
        </div>
    );
        
    return(
        <Main title="Erro 404" content={error}/>
    );
}

export default NotFound;