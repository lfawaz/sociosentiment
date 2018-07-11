import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/navbar'
//import USAMap from '../components/us_map'
import Race from './race'
import { SVGMap, USA } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import './us_map.css'
import './senate.css'
import DateFilter from '../components/date_filter'

//Load All Races in Seat

const defaultValue = 1

class Senate extends Component {
  constructor(props){
    super(props)

    this.state = {
      pointedLocation: null,
      senateRaces: {},
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

    const senateRaces = this.props.senateCandidateList.reduce((accu, nextValue) => {

      const race = nextValue.state
      const candidate = {
        screen_name: nextValue.screen_name,
        party: nextValue.party
      }

      if (!accu[race]){
        accu[race] = []
      }
      accu[race].push(candidate)

      return accu
    },{})

    const selectedLocations = new Set(Object.keys(senateRaces))

    this.setState({ senateRaces })
    this.setState({ selectedLocations })

    // console.log(races)
  }

  render(){

    const races = Object.keys(this.state.senateRaces).filter(race => this.state.selectedLocations.has(race)).map(race => {
      return <Race key={race} race={race} candidateList={this.state.senateRaces[race]} filterValue={this.state.filterValue}  />
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

function mapStateToProps({ senateCandidateList }){
  return { senateCandidateList }
}

export default connect(mapStateToProps)(Senate)
