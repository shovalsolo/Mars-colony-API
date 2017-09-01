import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 
import $ from 'jquery';

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

//---------------Report-----------------

class Report extends Component {
  constructor(props){
    super(props);
    this.state =({aliens:[]});
  }

    componentDidMount(){
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
    .then((response) => {
    let aliens = response.data.aliens;
    this.setState({aliens});

  })

  .catch(function (error) {
    console.log(error);
  });
  }


  render(){

    let aliens = this.state.aliens;
    let mappedaliens = aliens.map(alien => 

    <option value={alien.type}>{alien.type}</option>
    
    );


    return(
      
      <div>
      <br/>
      <p>Select alien type:</p>
      <select>
          {mappedaliens}
      </select>
      <br/><br/>
           
      Action taken:
      <input name="action" type="text" value="Action taken" />
      <br/>
      <input type="submit" value="Submit Report" />
      </div>
    );
  }

}


//---------------Encounters-----------------

class Encounters extends Component {
  constructor(props){
    super(props);
    this.state =({encounters:[]});
  }

    componentDidMount(){
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
    .then((response) => {
    let data = response.data.encounters;
    this.setState({encounters: data});

  })

  .catch(function (error) {
    console.log(error);
  });
  }


  render(){

    let encounters = this.state.encounters;
    let mappedEncounters = encounters.map(encounter => 
    <div class="getEncounter">
      <p> {"(Date :) "+encounter.date 
       +"  (ID :) "+ encounter.id  
       + " (Atype :) "+ encounter.atype 
       + " (Action :) "+ encounter.action } </p>
     </div>
    
    );


    return(
    <div>
        <div> 
        {mappedEncounters} 
        <button>Report Encounter</button>
        </div>
    </div>
    );
  }

}


//---------------form and input-----------------

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {namevalue: '',agevalue: '',jobvalue: '',jobs:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
    .then((response) => {
    let jobs = response.data.jobs;
    this.setState({jobs});

    })
  }


  handleChange(event) { //event handler that is called from text field on each click
  
    let theKey = event.target.name + "value";
    let value = event.target.value;
    this.setState({[theKey] : value }); //will re-render the box evey time because using setState
  }

  handleSubmit(event) { //event handler that is called when the form is submited
    alert('A name was submitted: ' + this.state.namevalue);
    event.preventDefault();
  }

  render() {

    let jobs = this.state.jobs;
    let mappedjobs = jobs.map(job => 
    
      <option value={job.name}>{job.name}</option>
    
    
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        <p>{this.state.namevalue}</p>
          Name:
          <input name="name" type="text" value={this.state.namevalue} onChange={this.handleChange} />
        </label>
        <label>
          Age:
          <input name="age" type="text" value={this.state.agevalue} onChange={this.handleChange} />
        </label>
        <label>
          Job:
          <input name="job" type="text" value={this.state.jobvalue} onChange={this.handleChange} />
        </label>


         
          
          <select>
            {mappedjobs}
          </select>
        

        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default App;
