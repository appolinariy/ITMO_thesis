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
        keyCol: 'id_filial',
        control_add: false,
        control_delete: false,
        control_input: false
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
                    control_add={this.state.control_add}
                    control_delete={this.state.control_delete}
                    control_input={this.state.control_input}
                />
            </>
            
        );
    }
}

export default Filial;