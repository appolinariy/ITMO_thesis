import React, { Component } from 'react';
import './Filial.css';
import { getFilials as printFilials} from '../../../libs/effects';

import Table from "../../Table/Table";

class Filial extends Component {
    state = {
        filialinfo: [ ],
        header: [
            {key: 'id_filial', name: '№'},
            {key: 'address', name: 'Адрес банковского филиала'},
            {key: 'phone_number', name: 'Контактный номер телефона'},            
        ],
        keyCol: 'id_filial'
    }

    componentDidMount() {
        printFilials().then(response => {
            console.log(response)
            this.setState({filialinfo: response})
        });
    }

    render() {
        return (
            <>
                <div className='filial_list'>Список филиалов банка</div>
                <Table
                    className={'filial'}
                    header={this.state.header}
                    data={this.state.filialinfo}
                    keyCol={this.state.keyCol}
                />
            </>
            
        );
    }
}

export default Filial;