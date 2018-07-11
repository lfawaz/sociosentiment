import React, { Component } from 'react'
import FilterItem from './filter_item'
import './date_filter.css'


class DateFilter extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedValue: this.props.filterValue
    }

    this.handleOnClickListItem = this.handleOnClickListItem.bind(this)
  }

  handleOnClickListItem(event){
    this.setState({ selectedValue: event.target.value })
    this.props.updateFilterValue( event.target.value )
  }


  render(){


    const filterItems = [
        {text: "All", value: 999},
        {text: "Year", value: 12},
        {text: "6-M", value: 6},
        {text: "3-M", value: 3},
        {text: "1-M", value: 1}
      ].map((item, index) => {
        const selected = this.state.selectedValue === item.value
        return <FilterItem selected={selected} key={item.value} value={item.value} text={item.text} />
      })

    return(<div className="date-filter-div">
      <ul className="filter-list"
      onClick = {this.handleOnClickListItem}>

      {filterItems}

      </ul>
      </div>)
  }
}

export default DateFilter
