import React, { Component } from 'react'
import { SVGMap, USA } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import './us_map.css'
class USAMap extends Component {
  render() {

    return (<SVGMap map={USA} />)
  }
}

export default USAMap
