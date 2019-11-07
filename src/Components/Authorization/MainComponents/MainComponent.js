import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './MainComponent.css';

class MainComponent extends Component{
  
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
              <p>Пользователь в системе</p>
            </Link>
          </header>

          <Switch>
            <Route path='/borrower'>
              <Borrower />
            </Route>
            <Route path='/debt'>
              <Debt />
            </Route>
            <Route path='/systemuser'>
              <SystemUser />
            </Route>
            <Route path='/'>
              <Filial />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const Filial = () => {
  return <main><h1>Филиалы</h1></main>;
}
const Borrower = () => {
  return <main><h1>Заемщики</h1></main>;
}
const Debt = () => {
  return <main><h1>Задолженности</h1></main>;
}
const SystemUser = () => {
  return <main><h1>Пользователь в системе</h1></main>;
}

export default MainComponent;
