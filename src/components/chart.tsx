import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { IChart } from '../types/IChart';
import { Carousel } from "antd"
const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'Total Votes',
      data: [12, 19, 3],
      borderWidth: 1,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
  
    },
  ],
};

const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Vote Statistics',
      },
    },
};


const VoteChart = (payload: IChart) => {
    payload.candidates.forEach((candidate, index) => {
        data.labels[index] = candidate.name;
        data.datasets[0].data[index] = candidate.votes;
    })

    return (
        <div style={{margin: "30px"}}>
            <Carousel autoplay>
                <div>
                    <Doughnut data={data} options={{maintainAspectRatio: false}} height={600}  type="pie" />
                </div>
                <div>
                    <Bar data={data} options={options} height={500}  type="bar" />
                </div>
            </Carousel>
        </div>
    );
}
export {  VoteChart }