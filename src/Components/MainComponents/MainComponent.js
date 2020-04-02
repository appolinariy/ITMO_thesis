import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import logo1 from "./logo1.png";
import user1 from "./user1.png";
import { withRouter } from "react-router";
import "./MainComponent.css";
import Filial from "./Filial/Filial";
import Borrower from "./Borrower/Borrower";
import Contract from "./Contract/contract";
import SystemUser from "./SystemUser/SystemUser";
import Authorization from "../Authorization/Authorization";
import Payment from "./Payment/payment";

class MainComponent extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ user: user });
    if (!user) {
      this.props.history.push("/auth");
    }
  }

  logout = () => {
    sessionStorage.removeItem("user");
    this.props.history.push("/auth");
  };

  render() {
    return this.state.user ? (
      <div className="content">
        {this.props.history.location.pathname !== "/auth" && (
          <header>
            <div className="icon">
              <img src={logo1} width="120px" alt="SkyBank" />
              <p className="SystemName">СИСТЕМА УЧЕТА КРЕДИТНЫХ ВЫПЛАТ</p>
              <div className="currentUser">
                {this.state.user.surname +
                  " " +
                  this.state.user.name +
                  " " +
                  this.state.user.father_name}
                <img className="userpic" src={user1} width="30px" alt="user" />
              </div>
            </div>
            <div className="links">
              <div className="modul">
                <Link to="/filials">Справочник</Link>
              </div>
              <div className="modul">
                <Link to="/borrower">Заемщики</Link>
              </div>
              <div className="modul">
                <Link to="/contract">Контракты</Link>
              </div>
              <div className="modul">
                <Link to="/debt">Выплаты</Link>
              </div>
              <div className="modul">
                <Link to="/systemuser">Администрирование</Link>
              </div>
              <input
                className="logout"
                type="button"
                value="Выйти"
                onClick={this.logout}
              />
            </div>
          </header>
        )}
        <Switch>
          <Route path="/borrower">
            <div className="main">
              <Borrower />
            </div>
          </Route>
          <Route path="/contract">
            <div className="main">
              <Contract />
            </div>
          </Route>
          <Route path="/debt">
            <div className="main">
              <Payment />
            </div>
          </Route>
          <Route path="/systemuser">
            <div className="main">
              <SystemUser user={this.state.user} />
            </div>
          </Route>
          <Route path="/filials">
            <div className="main filial">
              <Filial />
            </div>
          </Route>
          <Route path="/auth">
            <Authorization />
          </Route>
        </Switch>
      </div>
    ) : (
      <Route path="/auth">
        <Authorization />
      </Route>
    );
  }
}

export default withRouter(MainComponent);
