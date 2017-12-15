import React, { Component } from 'react'
import { TagCloud } from "react-tagcloud"


class SimpleCloud extends Component{

  showDetails(tag){
    const  record = this.props.data.filter((word) => word.value === tag.value)[0]
    alert(`${record.value}: ${record.count}`)
  }

  render(){
    const { data } = this.props

    return(
      <TagCloud minSize={12}
                maxSize={50}
                tags={data}
                onClick={tag => this.showDetails(tag)}/>

    )
  }


}
export default SimpleCloud
