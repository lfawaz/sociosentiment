import React, { Component } from 'react'
import ReactUSA from 'react-usa'

class USAMap extends Component {
  render() {
    const mapboxAccessToken = "" // Your access token
    const mapboxType = "streets";
    const position = [37.0902, -95.7129];
    const zoom = 3;
    const data = [
      {
        name: "Nebraska",
        values: [{label: "Capital", val: "Lincoln"}, {label: "Electoral Votes", val: 3}],
        color: "#E31A1C"
      }
    ]
    const stateStyle = { weight: 1, opacity: 1, color: '#666', dashArray: '3', fillOpacity: 0.7 };
    const stateHoverStyle = { weight: 5, color: '#FFF', dashArray: '1', fillOpacity: 0.7 };
    const excludeStates = ["District of Columbia", "Puerto Rico"];

    return (
      <div>

        <ReactUSA
          mapboxAccessToken={mapboxAccessToken} // Required
          mapHeight="500px" // Required
          mapWidth="100%"
          className="container"
          mapboxType={mapboxType}
          mapCenter={position}
          mapZoom={zoom}
          mapScrollZoom={false}
          neighborhoodOn={true}
          tooltip={true}
          tooltipSticky={false}
          data={data}
          stateStyle={stateStyle}
          stateHoverStyle={stateHoverStyle}
          excludeStates={excludeStates}
        />

      </div>
    )
  }
}

export default USAMap
