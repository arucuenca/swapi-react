import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import Main from './Main';
import NotFound from './NotFound';

import Filmes from './Filmes';
import Filme from './Filme';
import Personagens from './Personagens';
import Personagem from './Personagem';
import Planetas from './Planetas';
import Planeta from './Planeta';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Main}/>
            <Route path="/filmes" exact={true} component={Filmes} />
            <Route path="/filmes/:id" exact={true} component={Filme} />
            <Route path="/personagens" exact={true} component={Personagens}/>
            <Route path="/personagens/:id" exact={true} component={Personagem}/>
            <Route path="/planetas" exact={true} component={Planetas}/>
            <Route path="/planetas/:id" exact={true} component={Planeta}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();