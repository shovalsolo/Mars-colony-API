import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';
import './App.css';
import './Checkin.css';




//---------------form and input-----------------

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {message: 'loading...', namevalue: '',agevalue: '',job_id: '',jobs:[]};

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

  postColonist() {
        // post new colonist registration through api

        this.setState({
            message: 'Submitting...'
        });

        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            "colonist" : {
                "name" : this.state.namevalue,
                "age" : this.state.agevalue,
                "job_id" : this.state.job_id,
            }
        })
        .then((response) => {
            if (response) {
                this.setState({
                    response: response,
                    message: ''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


  handleChange(event) { //event handler that is called from text field on each click
  
    const theKey = event.target.name + "value";
    const value = event.target.value;
    
    this.setState({
    	[theKey] : value 
    }); //will re-render the box evey time because using setState
  }

  handleSubmit(event) { //event handler that is called when the form is submited
    this.postColonist();
    //alert('A name was submitted: ');
    event.preventDefault();
  }

  render() {

    let jobs = this.state.jobs;
    let job_id = jobs.id;
    let mappedjobs = jobs.map(job => 
    
      <option value={job.id} >{job.name}</option>

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
	          <p className="span_text" >Age:</p>
	          <input name="age" type="number" value={this.state.agevalue} onChange={this.handleChange} />
	        </label>
	        <br/>

	        <label>
	          <p className="span_text">Job:</p>
	        </label>
			<br/>        
	 
	          <select name="job_id" value={this.state.job_id} >
	            {mappedjobs}
	          </select>
	          <br/><br/>
	        
	        <input type="submit" value="CheckIn" />
	        <br/><br/>
	      </form>
	    </div>
    );
  }
}


export default CheckIn;
