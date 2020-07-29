import React from 'react';
import { withRouter } from "react-router";
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Main from './Main';
import Personagem from './Personagem';
import Planeta from './Planeta';

import './css/Filme.css';

class Filme extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filme: null,
            personagens: [],
            planetas: [],
            api: process.env.REACT_APP_SWAPI_URL + '/films/' + this.props.match.params.id + '/'
        }
    }

    async componentDidMount(){
        Axios.get(this.state.api).then(res => {
            this.setState({
                filme: res.data
            })
        }).then(async res => {
            await this.loadPersonagens();
            await this.loadPlanetas();
        })
    }

    async loadPersonagens(){
        Promise.all(this.state.filme.characters.map(url => {
            return Axios.get(url).then(res => {
                this.setState({
                    personagens: [...this.state.personagens, res.data]
                })
            })
        }))
    }

    async loadPlanetas(){
        Promise.all(this.state.filme.planets.map(url => {
            return Axios.get(url).then(res => {
                this.setState({
                    planetas: [...this.state.planetas, res.data]
                })
            })
        }))
    }

    render(){
        let dadosFilme, dadosAbertura, dadosPersonagens, dadosPlanetas;
        
        if(this.state.filme){
            dadosFilme = (
                <div className="div-filme">
                    <div>
                        <h3 className="page-header">Episódio {this.state.filme.episode_id + ' - ' + this.state.filme.title}</h3>
                    </div>
                    <div>
                        <h4>Lançamento: {new Date(this.state.filme.release_date).getFullYear()}</h4>
                    </div>
                </div>
            )

            dadosAbertura = (
                <div className="div-filme">
                    <div>
                        <h4>Abertura</h4>
                    </div>
                    <div>
                        <pre>{this.state.filme.opening_crawl}</pre>
                    </div>
                </div>
            )
        }

        if(this.state.personagens.length > 0){
            dadosPersonagens = (
                <div className="div-filme">
                    <div>
                        <h4>Personagens</h4>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Gênero</th>
                                    <th>Nascimento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.personagens.map((personagem) => { 
                                    let id = personagem.url.split('/')[5]
                                    return(
                                        <tr>
                                            <td><Link to={'/personagens/' + id} render={<Personagem/>}>{personagem.name}</Link></td>
                                            <td>{personagem.gender}</td>
                                            <td className="td-numero">{personagem.birth_year}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        if(this.state.planetas.length > 0){
            dadosPlanetas = (
                <div className="div-filme">
                    <div>
                        <h4>Planetas</h4>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Rotação</th>
                                    <th>Órbita</th>
                                    <th>Diâmetro</th>
                                    <th>Clima</th>
                                    <th>População</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.planetas.map(planeta => {
                                    let id = planeta.url.split('/')[5]
                                    return(
                                        <tr>
                                            <td><Link to={'/planetas/' + id} render={<Planeta/>}>{planeta.name}</Link></td>
                                            <td className="td-numero">{planeta.rotation_period}</td>
                                            <td className="td-numero">{planeta.orbital_period}</td>
                                            <td className="td-numero">{planeta.diameter}</td>
                                            <td>{planeta.climate}</td>
                                            <td className="td-numero">{planeta.population}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        let content = (
            <div className="div-filme">
                <div>
                    {dadosFilme}
                </div>
                <div className="div-extras-filme">
                    {dadosAbertura}
                    {dadosPersonagens}
                    {dadosPlanetas}
                </div>
            </div>
        );
        return(<Main title={this.state.filme ? this.state.filme.title : null} content={content} />)
    }
}
export default withRouter(Filme);