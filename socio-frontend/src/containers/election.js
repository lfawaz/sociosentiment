import React, { Component } from 'react'
import Navbar from '../components/navbar'
//import USAMap from '../components/us_map'
import Race from './race'
import { SVGMap, USA } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import './us_map.css'
import './election.css'
import DateFilter from '../components/date_filter'

//Load All Races in Seat

const defaultValue = 1

class Election extends Component {
  constructor(props){
    super(props)

    this.state = {
      pointedLocation: null,
      races: this.props.races,
      selectedLocations: new Set(),
      filterValue: defaultValue,
      tooltipStyle: {
				display: 'none'
			}
    }


  this.handleMapMouseClick = this.handleMapMouseClick.bind(this)
  this.isLocationSelected = this.isLocationSelected.bind(this)
  this.updateFilterValue = this.updateFilterValue.bind(this)
  this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
	this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
	this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
  }


  handleMapMouseClick(event){
    const clickedLocation = event.target.attributes.name.value;
		const isSelected = this.isLocationSelected(clickedLocation);

    this.setState(prevState => {
			let selectedLocations = new Set(prevState.selectedLocations);

			if (isSelected) {
				selectedLocations.delete(clickedLocation);
			} else {
				selectedLocations.add(clickedLocation);
			}

			return { ...prevState, selectedLocations };
		});


  }



isLocationSelected(location) {
		return this.state.selectedLocations.has(location);
	}


  updateFilterValue(filterValue){
    this.setState({ filterValue })
  }

  handleLocationMouseOver(event) {
		const pointedLocation = event.target.attributes.name.value;
		this.setState({ pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

	handleLocationMouseMove(event) {
		const tooltipStyle = {
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		};

		this.setState({ tooltipStyle });
	}

  componentWillMount(){
    const races = Object.keys(this.props.races)
    const selectedLocations = new Set(races.map(race => this.props.races[race].state))

    this.setState({ races })
    this.setState({ selectedLocations })
  }

  render(){


    const races = Object.keys(this.props.races).filter(race => this.state.selectedLocations.has(this.props.races[race].state)).map(race => {
      return <Race key={race} race={race} candidateList={this.props.races[race].candidates} filterValue={this.state.filterValue}  />
    })

    return (<div>
      <Navbar />
      <div className="usa-map-div">
        <SVGMap map={USA}
          type="checkbox"
          onLocationClick={e => this.handleMapMouseClick(e)}
          isLocationSelected={location => this.isLocationSelected(location.name)}
          onLocationMouseOver={this.handleLocationMouseOver}
					onLocationMouseOut={this.handleLocationMouseOut}
					onLocationMouseMove={this.handleLocationMouseMove}

          />
          <div style={this.state.tooltipStyle}>
						{this.state.pointedLocation}
					</div>
      </div>


    <DateFilter updateFilterValue={this.updateFilterValue} filterValue={this.state.filterValue} />
    <div className='races-div'>
          {races}
    </div>
      </div>)
  }
}


export default Election
