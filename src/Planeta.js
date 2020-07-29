import React from 'react';
import { withRouter } from "react-router";
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Main from './Main';
import Filme from './Filme';
import Personagem from './Personagem';

class Planeta extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            planeta: null,
            filmes: [],
            residentes: [],
            api: process.env.REACT_APP_SWAPI_URL + '/planets/' + this.props.match.params.id + '/'
        }
    }

    async componentDidMount(){
        Axios.get(this.state.api).then(res => {
            this.setState({
                planeta: res.data
            })
        }).then(async res => {
            await this.loadResidentes();
            await this.loadFilmes();
        })
    }

    async loadResidentes(){
        Promise.all(this.state.planeta.residents.map(url => {
            return Axios.get(url).then(res => {
                this.setState({
                    residentes: [...this.state.residentes, res.data]
                })
            })
        }))
    }

    async loadFilmes(){
        Promise.all(this.state.planeta.films.map(url => {
            return Axios.get(url).then(res => {
                this.setState({
                    filmes: [...this.state.filmes, res.data]
                })
            })
        }))
    }

    render(){
        let dadosPlaneta, dadosResidentes, dadosFilmes;

        if(this.state.planeta){
            dadosPlaneta = (
                <div>
                    <div>
                        <h3 className="page-header">{this.state.planeta.name}</h3>
                    </div>
                    <div>
                        <h4>População: {this.state.planeta.population}</h4>
                        <h4>Clima: {this.state.planeta.climate}</h4>
                        <h4>Período de rotação: {this.state.planeta.rotation_period}</h4>
                        <h4>Período de órbita: {this.state.planeta.orbital_period}</h4>
                        <h4>Diâmetro: {this.state.planeta.diameter}</h4>
                    </div>
                </div>
            )
        }

        if(this.state.filmes.length > 0){
            dadosFilmes = (
                <div>
                    <div>
                        <h4>Filmes</h4>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Episódio</th>
                                    <th>Lançamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filmes.map(filme => {
                                    let id = filme.url.split('/')[5]
                                    return(
                                        <tr>
                                            <td><Link to={'/filmes/' + id} render={<Filme/>}>{filme.title}</Link></td>
                                            <td className="td-numero">{filme.episode_id}</td>
                                            <td className="td-numero">{new Date(filme.release_date).getFullYear()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        if(this.state.residentes.length > 0){
            dadosResidentes = (
                <div>
                    <div>
                        <h4>Residentes</h4>
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
                                {this.state.residentes.map((residente) => { 
                                    let id = residente.url.split('/')[5]
                                    return(
                                        <tr>
                                            <td><Link to={'/personagens/' + id} render={<Personagem/>}>{residente.name}</Link></td>
                                            <td>{residente.gender}</td>
                                            <td className="td-numero">{residente.birth_year}</td>
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
            <div>
                <div>
                    {dadosPlaneta}
                </div>
                <div>
                    {dadosFilmes}
                    {dadosResidentes}
                </div>
            </div>
        )
        return(<Main title={this.state.planeta ? this.state.planeta.name : null} content={content} />)
    }
}
export default withRouter(Planeta);