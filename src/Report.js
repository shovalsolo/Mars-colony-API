import React, { Component } from 'react';
import axios from 'axios'; 

import './Report.css';



//---------------Report-----------------

class Report extends Component {
  constructor(props){
    super(props);
    this.state ={aliens:[] , actionvalue:''};
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
      	<form onSubmit={this.handleSubmit}>
		      <br/>
		      <p className="report-text">Select alien type:</p>
		      <select>
		          {mappedaliens}
		      </select>
		      <br/><br/>
		           
		      <p className="report-text">Action taken:</p>
		      <input name="action" type="text" value={this.state.actionvalue} />
		      <br/><br/>
		      <input type="submit" value="Submit Report" />
		      <br/><br/>
		</form>
      </div>
    );
  }

}


export default Report;