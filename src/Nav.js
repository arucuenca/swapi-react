import React from 'react';
import { Link } from "react-router-dom";

import Main from './Main';
import Filmes from './Filmes';
import Personagens from './Personagens';
import Planetas from './Planetas';

import './css/Nav.css';

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className="rotas">
                    <li className="item-rotas">
                        <Link to="/" render={<Main />}>Home</Link>
                    </li>
                    <li className="item-rotas">
                        <Link to="/filmes" render={<Filmes />}>Filmes</Link>
                    </li>
                    <li className="item-rotas">
                        <Link to="/personagens" render={<Personagens />}>Personagens</Link>
                    </li>
                    <li className="item-rotas">
                        <Link to="/planetas" render={<Planetas />}>Planetas</Link>
                    </li>
                </div>
            </nav>
        );
    }
}

export default Nav;