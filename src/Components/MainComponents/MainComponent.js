import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './MainComponent.css';
import Filial from './Filial/Filial.js';
import SystemUser from './SystemUser/SystemUser.js';

class MainComponent extends Component {
  
  render(){
    return(
      <Router>
        <div className='content'>
          <header>
             <Link to='/'>
              <p>Филиалы</p>
            </Link>
            <Link to='/borrower'>
              <p>Заемщики</p>
            </Link>
            <Link to='debt'>
              <p>Задолженности</p>
            </Link>
            <Link to='/systemuser'>
              <p>Администрирование</p>
            </Link>
          </header>

          <Switch>
            <Route path='/borrower'>
              <RenderBorrower />
            </Route>
            <Route path='/debt'>
              <RenderDebt />
            </Route>
            <Route path='/systemuser'>
              <RenderSystemUser />
            </Route>
            <Route path='/'>
              <RenderFilial />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const RenderFilial = () => {
  return <main><Filial /></main>;
}
const RenderBorrower = () => {
  return <main><h1>Заемщики</h1></main>;
}
const RenderDebt = () => {
  return <main><h1>Задолженности</h1></main>;
}
const RenderSystemUser = () => {
  return <main><SystemUser /></main>;
}

export default MainComponent;
