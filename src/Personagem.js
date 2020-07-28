import React from 'react';
import { withRouter } from "react-router";
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Main from './Main';
import Filme from './Filme';

class Personagem extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            personagem: null,
            filmes: [],
            api: process.env.REACT_APP_SWAPI_URL + '/people/' + this.props.match.params.id + '/'
        }
    }

    async componentDidMount(){
        Axios.get(this.state.api).then(res => {
            this.setState({
                personagem: res.data
            })
        }).then(async res => {
            await this.loadFilmes();
        })
    }

    async loadFilmes(){
        Promise.all(this.state.personagem.films.map(url => {
            return Axios.get(url).then(res => {
                this.setState({
                    filmes: [...this.state.filmes, res.data]
                })
            })
        }))
    }

    render(){
        let dadosPersonagem, dadosFilmes;

        if(this.state.personagem){
            dadosPersonagem = (
                <div>
                    <div>
                        <h3>{'Nome: ' + this.state.personagem.name}</h3>
                    </div>
                    <div>
                        <h4>Nascimento: {this.state.personagem.birth_year}</h4>
                    </div>
                    <div>
                        <h4>Gênero: {this.state.personagem.gender}</h4>
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
                                            <td>{filme.episode_id}</td>
                                            <td>{new Date(filme.release_date).getFullYear()}</td>
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
                    {dadosPersonagem}
                </div>
                <div>
                    {dadosFilmes}
                </div>
            </div>
        )

        return(<Main title={this.state.personagem ? this.state.personagem.name : null} content={content} />)
    }
}
export default withRouter(Personagem);