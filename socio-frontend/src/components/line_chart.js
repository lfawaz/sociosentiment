import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class LineChart extends Component {
  render(){
    const { labels, title, dataset } = this.props

    const data = {
      labels: labels,
      datasets: [{
        label: title,
        data: dataset,
        radius: 1
        //backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']

      }]
    }

    const options = {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true,
                                  maxTicksLimit: 6
                                  }
                              }]
                          }
                      }



    return (<div><Line data={data} options={options}/> </div>)
  }
}

export default LineChart
