import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Main from './Main';
import Personagem from './Personagem';

class Personagens extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            personagens: [],
            pagina: 1,
            totalResultados: 0,
            totalPaginas: 0,
            next: null,
            prev: null,
            pesquisa: "",
            api: process.env.REACT_APP_SWAPI_URL + '/people/'
        }

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handlePesquisaValue = this.handlePesquisaValue.bind(this);
        this.handlePesquisar = this.handlePesquisar.bind(this);

        Axios.get(this.state.api).then(res => {
            this.setState({
                personagens: res.data.results,
                totalResultados: res.data.count,
                totalPaginas: Math.ceil(res.data.count / res.data.results.length),
                next: res.data.next,
                prev: res.data.previous
            })
        })
    }

    handleNextPage(){
        Axios.get(this.state.next).then(res => {
            this.setState(oldState => ({
                personagens: res.data.results,
                next: res.data.next,
                prev: res.data.previous,
                api: oldState.next,
                pagina: oldState.next ? new URL(oldState.next).searchParams.get('page') : oldState.totalPaginas
            }))
        })
    }

    handlePrevPage(){
        Axios.get(this.state.prev).then(res => {
            this.setState(oldState => ({
                personagens: res.data.results,
                total: res.data.count,
                next: res.data.next,
                prev: res.data.previous,
                api: oldState.prev,
                pagina: oldState.prev ? new URL(oldState.prev).searchParams.get('page') : 1
            }))
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
                    personagens: res.data.results,
                    totalResultados: res.data.count,
                    totalPaginas: Math.ceil(res.data.count / res.data.results.length),
                    next: res.data.next,
                    prev: res.data.previous

                })
            })
        }else{
            await Axios.get(this.state.api).then(res => {
                this.setState({
                    personagens: res.data.results,
                    totalResultados: res.data.count,
                    totalPaginas: Math.ceil(res.data.count / res.data.results.length),
                    next: res.data.next,
                    prev: res.data.previous
                })
            }) 
        }
    }

    render(){
        let nextButtn, prevButtn, paginador, lista, content, pesquisa;

        pesquisa = (
            <div>
                <div>
                    <h4>Pesquisar personagens</h4>
                </div>
                <div>
                    <input type="text" placeholder="Digite o nome" value={this.state.pesquisa} onChange={this.handlePesquisaValue}/>
                    <button onClick={this.handlePesquisar}>Pesquisar</button>
                </div>
            </div>
        )

        if(this.state.personagens.length > 0){
            lista = this.state.personagens.map((personagem) => {
                return (
                    <li id={personagem.url}>
                        <Link to={'/personagens/' + personagem.url.split('/')[5]} render={<Personagem />}>{personagem.name}</Link>
                    </li>
                )
            })
        }else{
            lista = (
                <div>
                    <h4>Nenhum resultado encontrado!</h4>
                </div>
            )
        }

        if(this.state.next){
            nextButtn = <div><button onClick={this.handleNextPage}>Próxima</button></div>;
        }

        if(this.state.prev){
            prevButtn = <div><button onClick={this.handlePrevPage}>Anterior</button></div>;
        }

        if(this.state.personagens.length > 0){
            paginador = <code>{this.state.pagina + '/' + this.state.totalPaginas}</code>
        }

        content = (
            <div>
                <div>
                    {pesquisa}
                </div>
                <div>
                    <ul>
                        {lista}
                    </ul>

                    {this.state.prev ? prevButtn : null}
                    {this.state.personagens.length > 0 ? paginador : null}
                    {this.state.next ? nextButtn : null}
                </div>
            </div>
        );

        return(<Main title="Personagens" content={content}/>);
    };
}

export default Personagens;