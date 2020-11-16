import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
width: '40vw',
height: '40wv'
};

export class MapContainer extends Component {
    constructor(props){
        super(props);
        // console.log(props)
        this.state = {
            markers: [],
        }
    }

    makeMarkers(arrayQuakes){
        const newArr = arrayQuakes.map((quakes,index)=>{
            const markerTag = <Marker 
            className = "marker"
            position={{ lat: quakes.geometry.coordinates[1], lng: quakes.geometry.coordinates[0] }}
            key = {index}
            icon = {{url:require('../images/earthquake.png'), scaledSize:  new this.props.google.maps.Size(25,25)}}
            />
            // console.log(quakes.geometry.coordinates[0])

            // console.log(quakes.properties)
            return markerTag;
        });
        this.setState({markers:newArr});
    }

    componentDidMount(){
        axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson')
        .then((response)=>{
            // handle success
            console.log(response.data.features[0]);
            this.makeMarkers(response.data.features)
            // console.log(this.state)

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() {
        return (
        <Map
            google={this.props.google}
            zoom={5}
            style={mapStyles}
            initialCenter={
                {lat: 37.78, lng: -122.44}
            }
        > 
        {this.state.markers}
            <Marker
            position={{ lat: -1.3, lng: 36.8233 }}
            />
            <Marker
            position={{ lat: -3.3, lng: 36.8233 }}
            />
        </Map>
        );
    }
}

export default GoogleApiWrapper({
apiKey: 'AIzaSyB1wX15AO-cbX5lbmu-S1XdFItXxCEUmd8'
})(MapContainer);
