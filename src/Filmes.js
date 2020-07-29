import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Main from './Main';
import Filme from './Filme';

class Filmes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filmes:[],
            pesquisa: "",
            api:process.env.REACT_APP_SWAPI_URL + '/films/'
        }
        this.handlePesquisaValue = this.handlePesquisaValue.bind(this);
        this.handlePesquisar = this.handlePesquisar.bind(this);
    }

    componentDidMount(){
        Axios.get(this.state.api).then((res) => {
            this.setState({
                filmes: res.data.results
            })
        })
    }

    handlePesquisaValue(event){
        this.setState({
            pesquisa: event.target.value.trim()
        })
    }

    async handlePesquisar(event){
        if(this.state.pesquisa.length > 0){
            await Axios.get(this.state.api + '?search=' + this.state.pesquisa).then(res => {
                this.setState({
                    filmes: res.data.results
                })
            })
        }else{
            await Axios.get(this.state.api).then(res => {
                this.setState({
                    filmes: res.data.results
                })
            }) 
        }
    }

    render(){
        let content, pesquisa, tabela;

        if(this.state.filmes.length > 0){
            tabela =(
                <div className="div-lista">
                    <div>
                        <h4 className="page-header">Lista de filmes</h4>
                    </div>
                    <div className="lista-itens">
                        {this.state.filmes.map((filme) => {
                            let id = filme.url.split('/')[5]
                            return (
                                <div key={'div_' + filme.url} className="lista-item">
                                    <Link key={'link_' + filme.url} to={'/filmes/' + id} render={<Filme />}>
                                        Episódio {filme.episode_id} - {filme.title} ({new Date(filme.release_date).getFullYear()})
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) 
        }else{
            tabela = (
                <div className="div-lista">
                    <div>
                        <h4 className="page-header">Lista de filmes</h4>
                    </div>
                    <h4>Nenhum resultado encontrado!</h4>
                </div>
            )
        }

        pesquisa = (
            <div className="div-pesquisa">
                <div>
                    <h4 className="page-header">Pesquisar filmes</h4>
                </div>
                <div className="div-input">
                    <input type="text" placeholder="Digite o título"
                           value={this.state.pesquisa} onChange={this.handlePesquisaValue}/>
                    <button onClick={this.handlePesquisar}>Pesquisar</button>
                </div>
            </div>
        )
        
        content = (
            <div>
                <div className="div-content">
                    {pesquisa}
                    {tabela}
                </div>
            </div>
        );

        return(<Main title="Filmes" content={content}/>);
    };
}

export default Filmes;