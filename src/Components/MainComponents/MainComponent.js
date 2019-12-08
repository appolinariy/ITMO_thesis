import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";
import './MainComponent.css';
import Filial from './Filial/Filial.js';
import SystemUser from './SystemUser/SystemUser.js';
import Authorization from "../Authorization/Authorization";

class MainComponent extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem('user')) 
    this.setState({user: user})
    if(!user) {
      this.props.history.push('/auth');
    }
  }

  componentDidUpdate(){
    let user = JSON.parse(sessionStorage.getItem('user'))
    if(!user) {
      this.props.history.push('/auth');
    }
    if(user.id_user !== this.state.user.id_user) {
      this.setState({user: user})
    }
  }

  render(){
    return this.state.user ? (
        <div className='content'>
          {this.props.history.location.pathname !== '/auth' &&
          (<header>
             <Link to='/filials'>
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
          </header>)}
            <Switch>
              <Route path='/borrower'>
                <div className='main'><h1>Заемщики</h1></div>
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
    ) : (<p>Loading ...</p>);
  }
}

export default withRouter(MainComponent);
