import React, { Component } from 'react';
import './MainComponent.css';

class MainComponent extends Component{
  
  render(){
    return(
      <div className='content'>
        <header>
          <div className='button'>
            <p>Филиалы</p>
          </div>
          <div className='button'>
            <p>Заемщики</p>
          </div>
          <div className='button'>
            <p>Задолженности</p>
          </div>
          <div className='button'>
            <p>Пользователь в системе</p>
          </div>
        </header>
        <main>
          
        </main>
      </div>
      
    );
  }
}

export default MainComponent;
