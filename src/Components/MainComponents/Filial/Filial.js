import React, { Component } from "react";
import "./Filial.css";
import { getFilials as printFilials } from "../../../libs/effects";
import Phone from "./phone.png";

import Table from "../../Table/Table";

class Filial extends Component {
  state = {
    filialinfo: [],
    header: [
      { key: "address", name: "Адрес филиала" },
      { key: "phone_number", name: "Контактный номер телефона" }
    ],
    keyCol: "id_filial"
  };

  componentDidMount() {
    printFilials().then(response => {
      this.setState({ filialinfo: response });
    });
  }

  render() {
    return (
      <>
        <div className="filial_list">Отделения банка и телефоны для связи</div>
        <Table
          className={"filial"}
          header={this.state.header}
          data={this.state.filialinfo}
          keyCol={this.state.keyCol}
        />
        <div className="info">
          <h5>
            Официальный сайт:{" "}
            <a className="siteSkyBank" href="https://www.sky.bank/">
              https://www.sky.bank/
            </a>
          </h5>
          <div className="phones">
            <img src={Phone} alt="Телефон" />
            <h5>0 800 503 444 (тех-поддержка)</h5>
          </div>
        </div>
      </>
    );
  }
}

export default Filial;
