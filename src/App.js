import React from 'react'
import Map from './Map'
import './App.css'

class App extends React.Component {
  state = {
    map: '',
    info: ''
  }
  componentDidMount() {
    window.initMap = this.initMap
    // append the Google Map API script as the last child of <body>
    const script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAD-9mxlvsiVnVpdpRQhCBDAoVQdoBrbyM&v=3&callback=window.initMap"
    document.body.appendChild(script)
  }

  initMap = () => {
    let map
    let infoWindow
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 38.889931, lng: -77.009003 }, // Washington D.C
      zoom: 13,
      mapTypeControl: false
    })

    infoWindow = new window.google.maps.InfoWindow({})
    this.setState({
      map: map,
      info: infoWindow
    })
  }

  render() {
    return (
      <Map />
    )
  }
}

export default App;
