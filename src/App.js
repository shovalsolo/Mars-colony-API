import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 

import Report from './Report';
import Encounters from './Encounters';
import CheckIn from './CheckIn';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

var ReactRouter = require('react-router-dom');
//var Router = ReactRouter.BrowserRouter;
//var Route = ReactRouter.Route;

class App extends Component {

 constructor(props){
    super(props);
    this.state =({encounter:"loading", encounters: []});
   
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Mars</h2>
            <br/>
          </div>
          

          <ul className="nav">
            <li><Link to="/">Home to Check In</Link></li>
            <li><Link to="/encounters">See all Encounters</Link></li>
            <li><Link to="/report">Report an Encounter</Link></li>
          </ul>

            <hr/>
          
          <Route exact path="/" component={CheckIn}/>
          <Route path="/encounters" component={Encounters}/>
          <Route path="/report" component={Report}/>
        </div>
      </Router>
    );
  }
}


export default App;
