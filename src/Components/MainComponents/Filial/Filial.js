import React, { Component } from 'react';
import './Filial.css';
import { getFilials as printFilials } from '../../../libs/effects';

import Table from "../../Table/Table";

class Filial extends Component {
    state = {
        filialinfo: [],
        header: [
            { key: 'address', name: 'Адрес филиала' },
            { key: 'phone_number', name: 'Контактный номер телефона' },
        ],
        keyCol: 'id_filial'
    }

    componentDidMount() {
        printFilials().then(response => {
            this.setState({ filialinfo: response })
        });
    }

    render() {
        return (
            <>
                <div className='filial_list'>Отделения банка и телефоны для связи</div>
                <Table
                    className={'filial'}
                    header={this.state.header}
                    data={this.state.filialinfo}
                    keyCol={this.state.keyCol}
                />
                {/* <p>Ссылка на официальный сайт: WEB_PAGE</p> */}
            </>
        );
    }
}

export default Filial;