import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    map: '',
    info: ''
  }

  componentDidMount() {
    const script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAD-9mxlvsiVnVpdpRQhCBDAoVQdoBrbyM&v=3&callback=initMap"
    document.body.appendChild(script)

    window.initMap = this.initMap
  }

  initMap() {
    let map
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 38.889931, lng: -77.009003 }, // Washington D.C
      zoom: 13,
      mapTypeControl: false
    });

    let infoWindow = new window.google.maps.InfoWindow();
    this.setState({
      map: map,
      info: infoWindow
    })
  }

  render() {
    return (
      'This is a dc-reastaurants-map app demo!'
    )
  }
}

export default App;
