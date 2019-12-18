import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
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

  render() {
    return this.state.user ? (
      <div className='content'>
        {this.props.history.location.pathname !== '/auth' &&
          (<header>
            <Link to='/filials'>
              <p>Справочник</p>
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
