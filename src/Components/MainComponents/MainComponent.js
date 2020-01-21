import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import sovk from "./sovk.png"
import { withRouter } from "react-router";
import './MainComponent.css';
import Filial from './Filial/Filial';
import Borrower from './Borrower/Borrower';
import SystemUser from './SystemUser/SystemUser';
import Authorization from "../Authorization/Authorization";

class MainComponent extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log('user from Session storage', user, !user, this.props.history)
    this.setState({ user: user })
    if (!user) {
      this.props.history.push('/auth');
    }
  }

  logout = () => {
    sessionStorage.removeItem('user');
    this.props.history.push("/auth");
  }

  render() {
    return this.state.user ? (
      <div className='content'>
        {this.props.history.location.pathname !== '/auth' &&
          (<header>
            <div className='icon'>
              <img src={sovk} width='190px' alt='Совкомбанк' />
              <p className='SystemName'>Cистема учета кредитных выплат</p>
            </div>
            <div className='links'>
              <p>
                <Link to='/filials'>
                  Справочник
            </Link>
              </p>
              <p>
                <Link to='/borrower'>
                  Заемщики
            </Link>
              </p>
              <p>
                <Link to='debt'>
                  Задолженности
            </Link>
              </p>
              <p>
                <Link to='/systemuser'>
                  Администрирование
            </Link>
              </p>
            </div>
            <input className='logout' type='button' value='Выйти' onClick={this.logout} />
          </header>)}
        <Switch>
          <Route path='/borrower'>
            <div className='main'><Borrower /></div>
          </Route>
          <Route path='/debt'>
            <div className='main'><h1>Задолженности</h1></div>
          </Route>
          <Route path='/systemuser'>
            <div className='main'><SystemUser user={this.state.user} /></div>
          </Route>
          <Route path='/filials'>
            <div className='main'><Filial /></div>
          </Route>
          <Route path='/auth'>
            <Authorization />
          </Route>
        </Switch>
      </div>
    ) : (
        <Route path='/auth'>
          <Authorization />
        </Route>);
  }
}

export default withRouter(MainComponent);
