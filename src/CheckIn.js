import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';
import './App.css';
import './Checkin.css';




//---------------form and input-----------------

class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            jobs: [],
            name: '',
            age: '',
            job_id: '',
            message: ''
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs() {
        // get job list for dropdown from api

        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
            .then((response) => {
                this.setState({
                    jobs: response.data.jobs,
                    job_id: response.data.jobs[0].id,
                    message: ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.postColonist();
        event.preventDefault();
    }

    postColonist() {
        // post new colonist registration through api

        this.setState({
            message: 'Submitting...'
        });

        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            "colonist" : {
                "name" : this.state.name,
                "age" : this.state.age,
                "job_id" : this.state.job_id
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

    render() {
        if (this.state.response.data !== undefined) {
            // confirmation message for api post

            let colonist = this.state.response.data.colonist;

            return (
                <div className="App">
                    <br />
                    <h3 className="span_text">Your colonist has been submitted.</h3>
                    <br />
                    <div className="post-response">
                        <div className="span_text"><label>Colonist ID:</label><h5>{colonist.id}</h5></div>
                        <div className="span_text"><label>Name:</label><h5>{colonist.name}</h5></div>
                        <div className="span_text"><label>Age:</label><h5>{colonist.age}</h5></div>
                        <div className="span_text"><label>Job:</label><h5>{colonist.job.name}</h5></div>
                        <div className="span_text"><label>Description:</label><h5>{colonist.job.description}</h5></div>
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            // display loading message

            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else if (this.state.jobs.length > 0) {
            // input form for new colonist registration

            let jobs = this.state.jobs;

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br />
                    <h3 className="span_text">New Colonist</h3>
                    <br />
                    <p className="span_text">Name:</p>
                    <input name="name" type="text" value={this.state.name} required 
                    onChange={(event) => this.handleChange(event)} />
                    <br />
                    <p className="span_text">Age:</p>
                    <input
                        name="age"
                        type="number"
                        value={this.state.age}
                        required
                        onChange={(event)=>this.handleChange(event)} />
                    <br />
                    <p className="span_text">Job:</p>
                    <select name="job_id" value={this.state.job_id} onChange={(event) => this.handleChange(event)}>
                        {jobs.map(job => <option key={job.id} value={job.id}>{job.name}</option>)}
                    </select>
                    <br /><br />
                    <input type="submit" value="CheckIn" />
                    <br />
                    <br />
                </form>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}


export default CheckIn;
