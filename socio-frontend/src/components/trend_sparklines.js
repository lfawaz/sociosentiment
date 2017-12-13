import React from 'react'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';


const TrendSparklines = ({data, color}) => {
  return(
    <Sparklines data={data}>
      <SparklinesLine color={color}/>
      <SparklinesSpots />
      </Sparklines>
  )
};

export default TrendSparklines
