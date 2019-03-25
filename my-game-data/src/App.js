import React, { Component } from 'react';
import './App.css';
import MyNavbar from './Component/Navbar/Navbar'
import {Route, Link} from 'react-router-dom'
import Gameinfo from './Container/Gameinfo/Gameinfo'
import Settings from './Container/Settings/Settings'


class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <MyNavbar/>
        <Route path='/' exact component={Gameinfo}></Route>
        <Route path='/settings' component={Settings}></Route>
      </div>
    );
  }
}



export default App;