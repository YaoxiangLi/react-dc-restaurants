import React, { Component } from 'react'

class ListView extends Component {
  state = {
    query: '',
    info: '',
    markers: []
  }

  componentDidMount() {
    this.setState({markers: this.props.markers})
  }

  showSideBar = () => {
    const sideBar = document.querySelector('.sideBar');
    if (sideBar.style.display === 'none') {
      sideBar.style.display = 'block'
    } else {
      sideBar.style.display = 'none'
    }
  }

  search = (e) => {
    const query = e.target.value.toLowerCase()
    const markers = this.props.markers
    const newMarkers = []

    markers.forEach((marker) => {
      if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        marker.setVisible(true)
        newMarkers.push(marker)
      } else {
        marker.setVisible(false)
      }
    })
    this.setState({markers: newMarkers})
  }

  render() {
    const { markers } = this.state
    const { showMarker } = this.props
    return (
      <div>
        <div className="veggieburgers" onClick={this.showSideBar}>
          <div className="veggieline"></div>
          <div className="veggieline"></div>
          <div className="veggieline"></div>
        </div>
        <div className="sideBar">
          <div className="form" role="form">
            <input type="text"
              aria-labelledby="filter" placeholder="Search..."
              className="input" role="search"
              onChange={this.search}/>
          </div>
          <ul>
            {markers && markers.map((marker, index) =>
              <li key={ index }>
                <a
                  onClick={ showMarker.bind(this, marker) }
                  onKeyPress={ showMarker.bind(this, marker) }
                  tabIndex="0"
                  role="button">{ marker.title }
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListView;
