import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';
import './App.css';
import './Checkin.css';




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
    	<div className="checkin-div">
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          <p className="span_text">Name:</p>
	          <input name="name" type="text" value={this.state.namevalue} onChange={this.handleChange} />
	        </label>
	        <br/>
	        
	        <label>
	          <p className="span_text">Age:</p>
	          <input name="age" type="text" value={this.state.agevalue} onChange={this.handleChange} />
	        </label>
	        <br/>

	        <label>
	          <p className="span_text">Job:</p>
	          <input name="job" type="text" value={this.state.jobvalue} onChange={this.handleChange} />
	        </label>
			<br/><br/>	        
	 
	          <select>
	            {mappedjobs}
	          </select>
	          <br/><br/>
	        
	        <input type="submit" value="Submit" />
	        <br/><br/>
	      </form>
	    </div>
    );
  }
}


export default CheckIn;
