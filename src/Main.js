import React from 'react';

import Nav from './Nav';

import './Main.css';

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
                <h1 className="ini-header">Bem vindo ao APP de uma galáxia muito, muito distante</h1>
            </div>
            <div>
                <div>
                    <h2>Navegue pelo menu superior ou explore as rotas do APP!</h2>
                </div>
                <div>
                    <div>
                        <h3><code>/filmes</code> Exibe todos os detalhes sobre os filmes da saga;</h3>
                    </div>
                    <div>
                        <h3><code>/personagens</code> Permite que conheça os personagens do universo Star Wars;</h3>
                    </div>
                    <div>
                        <h3><code>/planetas</code> Te leva para uma viagem pelos planetas da galáxia;</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;