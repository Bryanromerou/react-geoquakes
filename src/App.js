import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import Quakes from './components/Quakes';

class App extends Component{
  constructor(){
    super();
    this.state = {
      map:<h1/>,
      banana: "red"
    }
  }
  componentDidMount(){
    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson')
    .then((response)=>{
        // handle success
        this.setState({map:<Map markers= {response.data.features[0].properties}/>})
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  }
  render(){
    return (
      <div className="app">
        <div className="mapContainer">
          ...put Map Component here...
          {this.state.map}
        </div>
        <div className="quakeContainer">
          <h1 onClick = {this.funct}>Earthquakes from the past week:</h1>
          ...put Quakes Component here...
          <Quakes/>
        </div>
      </div>
    );
  }
}

export default App;
