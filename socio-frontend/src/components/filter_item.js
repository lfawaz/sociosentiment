import React from 'react'
import './filter_item.css'

const FilterItem = ({ text, value, selected }) => {
  return(<li className={selected === true ? "filter-item filter-item-selected"  : "filter-item"} value={value}>{text}</li>)
}


export default FilterItem;
