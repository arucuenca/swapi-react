import React from 'react';

import Nav from './Nav';

import './css/Main.css';

class Main extends React.Component{
    render(){
        return(
            <div>
                <title>{this.props.title}</title>
                
                <div className="div-nav">
                    <Nav />
                </div>
                
                <div className="div-pan">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

Main.defaultProps = {
    title: 'SWAPI - React',
    content: (
        <div>
            <div>
                <h2 className="page-header">Bem vindo ao APP de uma galáxia muito, muito distante</h2>
            </div>
            <div>
                <div className="div-rotas">
                    <div className="div-rota">
                        <h3><code>/filmes</code></h3>
                        <h4>Exibe todos os detalhes sobre os filmes da saga;</h4>
                    </div>
                    <div className="div-rota">
                        <h3><code>/personagens</code></h3>
                        <h4>Permite que conheça os personagens de Star Wars;</h4>
                    </div>
                    <div className="div-rota">
                        <h3><code>/planetas</code></h3>
                        <h4>Te leva para uma viagem pelos planetas da galáxia;</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;