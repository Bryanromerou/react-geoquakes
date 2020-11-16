import React , {Component} from 'react';
import axios from 'axios';

class Quakes extends Component{
    constructor(){
        super()
        this.state = {
            logs: [],
        }
    }
    makeLogs = (arrayQuakes)=>{
        const newArr = arrayQuakes.map((quakes,index)=>{
        const pTag = <p key = {index}>{quakes.properties.title}</p>
            return pTag;
        });
        this.setState({logs:newArr});
    }
    componentDidMount(){
        axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson')
        .then((response)=>{
            // handle success
            console.log(response.data.features[0].properties);
            this.makeLogs(response.data.features)
            // console.log(this.state)

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    render(){
        return (
            <div>
                <h1>
                This is Your Quakes component
                </h1>
                {this.state.logs}

            </div>
        );
    }
}

export default Quakes;