import React from 'react'
import Map from './Map'
import ListView from './ListView'
import './App.css'

class App extends React.Component {
  state = {
    map: '',
    infoWindow: '',
    tags: [
      {
        lat: 38.8979725,
        long: -77.0332762,
        name: "Old Ebbitt Grill"
      },
      {
        lat: 38.900305,
        long: -77.0444647,
        name: "Founding Farmers DC"
      },
      {
        lat: 38.8987445,
        long: -77.023684,
        name: "Zaytinya"
      },
      {
        lat: 38.9113639,
        long: -77.0315724,
        name: "Le Diplomate"
      },
      {
        lat: 38.9022395,
        long: -77.0244737,
        name: "Acadiana"
      },
      {
        lat: 38.9018414,
        long: -77.0332468,
        name: "Siroc Restaurant"
      },
    ],
    markers: []
  }

  componentDidMount() {
    window.initMap = this.initMap
    let script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAD-9mxlvsiVnVpdpRQhCBDAoVQdoBrbyM&v=3&callback=window.initMap"
    document.body.appendChild(script)
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 38.8979725, lng: -77.0332762 }, // Washington D.C
      zoom: 13,
      mapTypeControl: false
    })

    const infoWindow = new window.google.maps.InfoWindow({})
    this.setState({
      map: map,
      infoWindow: infoWindow
    })
    this.generateMarkers(map)
  }

  generateMarkers = (map) => {
    let self = this
    this.state.tags.forEach(marker => {
      const loc = {lat: marker.lat, lng: marker.long}
      let mark = new window.google.maps.Marker({
        position: loc,
        title: marker.name,
        animation: window.google.maps.Animation.DROP,
        map: map
      })
      mark.addListener('click', function() {
        self.showMarker(mark)
      })
      let newMakers = this.state.markers
      newMakers.push(mark)
      this.setState({markers: newMakers})
    })
  }


  showMarker = (marker) => {
    const CLIENT_ID = "WT4UPILVTMA5WNQ0VZ4Z2XJCJSRDZHCME3DHMXAZHOECIOYQ"
    const CLIENT_SECRET = "MNWOFUZR3IRQ2NXMVNOZQDBD504KKHBHWPCBIETA5U3QXO2Z"
    const URL =`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&limit=1`
    // Check to make sure the infowindow is not already opened on this marker
    if (this.state.infoWindow.marker !== marker) {
      this.state.infoWindow.marker = marker
      // this.setState({infoWindow: {marker: marker}})
      this.state.infoWindow.open(this.state.map, marker)
      // marker.setAnimation(window.google.maps.Animation.DROP)
      this.state.infoWindow.addListener('closeClick', function() {
        this.state.infoWindow.setMarker(null)
      })
      this.markerInfo(URL)
    }
  }

  markerInfo(url) {
    let self = this.state.infoWindow
    fetch(url)
    .then(function (res) {
      if (res.status !== 200) {
        this.state.infoWindow.setContent("Error loading data from API!")
      }
      res.json().then(function (data) {
        const restaurant = data.response.venues[0]
        let category, address
        // console.log(data.response.venues[0])
        if (restaurant.categories[0].name) {
          category = `<p><b>Categories: </b>${restaurant.categories[0].name}</p>`
        }
        if (restaurant.location.formattedAddress) {
          address = `<p><b>Address: </b> ${restaurant.location.formattedAddress}</p>`
        }
        let info = `<div id='marker'><h2>${self.marker.title}</h2>${category}${address}</div>`
        self.setContent(info)
      })
    })
    .catch(function(e) {
      self.setContent("Error loading data from API!")
    })
  }

  render() {
    return (
      <div>
        <header>
          <ListView
            markers={ this.state.markers }
            showMarker={ this.showMarker }
            infoWindow={ this.state.infoWindow }
          />
          <h1 id="title">Restaurants in D.C.</h1>
        </header>
        <Map />
      </div>
    )
  }
}

export default App;
