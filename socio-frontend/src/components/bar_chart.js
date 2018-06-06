import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

class BarChart extends Component {
  render(){
    const { labels, title, dataset } = this.props

    const data = {
      labels: labels,
      datasets: [{
        label: title,
        data: dataset,
        //backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)']

      }]
    }

    const options = {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                                  }
                              }]
                          }
                      }



    return (<div><Bar data={data} options={options}/> </div>)
  }
}

export default BarChart
