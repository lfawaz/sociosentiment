import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import './chart.css'


class ChartLine extends Component {
  render(){
  const tweetDate = this.props.tweetDate

  const data= {
        labels: this.props.labels,
        datasets: [{
            label: this.props.label,
            data: this.props.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]}

  return (<div className="div-chart"><Line
          data={data}
          options={{
        maintainAspectRatio: true,

        tooltips: {
            height: 50,
            callbacks: {
                labelColor: function(tooltipItem, chart) {
                    return {
                        borderColor: 'rgb(255, 0, 0)',
                        backgroundColor: 'rgb(255, 0, 0)'
                    }
                },
                 label:function(tooltipItem, data){
                   return `Data:${tweetDate[tooltipItem.index]}`
                 }
            }
        }

    }}/>
  </div>)
  }

}

export default ChartLine
