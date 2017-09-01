import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';



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


export default Report;