import React, { Component } from 'react';
import axios from 'axios'; 
import $ from 'jquery';




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


export default Encounters;