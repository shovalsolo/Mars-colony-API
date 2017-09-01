import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 
import $ from 'jquery';
import Report from './Report';
import Encounters from './Encounters';
import CheckIn from './CheckIn';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends Component {

 constructor(props){
    super(props);
    this.state =({encounter:"loading", encounters: []});
   
  }

  render(){
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Mars</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
        <CheckIn />
        <Report />
        <Encounters encounter={this.state.encounters} />
       
      </div>
    );
  }
}


export default App;
