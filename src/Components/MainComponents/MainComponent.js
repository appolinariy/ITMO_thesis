import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";
import './MainComponent.css';
import Filial from './Filial/Filial.js';
import SystemUser from './SystemUser/SystemUser.js';
import Authorization from "../Authorization/Authorization";
import { getBankUserById } from '../../libs/effects';

class MainComponent extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    let user = sessionStorage.getItem('user') 
    console.log('user from cache', user)
    //getBankUserById(user.id_user).then()
    if(user && !user.id_user) {
      this.props.history.push('/auth');
    }
  }

  render(){
    return(
        <div className='content'>
          {/*this.state.user &&
          (*/}<header>
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
          </header>{/*)
          }*/}
          <main className='main'>
            <Switch>
              <Route path='/borrower'>
                <h1>Заемщики</h1>
              </Route>
              <Route path='/debt'>
                <h1>Задолженности</h1>
              </Route>
              <Route path='/systemuser'>
                <SystemUser />
              </Route>
              <Route exact path='/'>
                <Filial />
              </Route>
              <Route path='/auth'><Authorization /></Route>
            </Switch>
          </main>
        </div>
    );
  }
}

export default withRouter(MainComponent);
