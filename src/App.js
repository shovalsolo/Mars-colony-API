import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import {getEncounters} from './request.js';
import axios from 'axios'; 


class App extends Component {


 constructor(props){
    super(props);
    this.state =({fact:"loading"});
   
  }

    componentDidMount(){
    axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
  .then(function (response) {
    
    // console.log(response.data.encounters.length);
    // console.log(response.data.encounters);
    let encounters = response.data.encounters;

    for (var i = 0 ; i< encounters.length;i++ ){
        console.log( encounters[i]);
       
    }

    // const encComps = encounters.map((encounter)=>{
    //   return <Encounter id={encounter.id} />
    // });


  })

  .catch(function (error) {
    console.log(error);
  });
  }

  render(){
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Fact fact={this.state.fact}/>
      <div></div>  
      </div>
    );
  }
}

// class Encounter extends Component {
//   constructor(props){
//     super(props);
//     this.state =({encounter:''});
//   }
    
  
//   render(){
//     return(
//     <div>
//         <div> {this.props.encounter} </div>
//     </div>
//     );
//   }

// }

class Fact extends Component {
  constructor(props){
    super(props);
    
  }
  render(){
    return(
    <div>
        <div> {this.props.fact} </div>
    </div>
    );
  }

}

export default App;
