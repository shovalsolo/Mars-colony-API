import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';




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


export default CheckIn;
