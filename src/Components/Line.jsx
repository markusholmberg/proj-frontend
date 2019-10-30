import React, { Component } from 'react';
import Chart from 'chart.js';

export default class Line extends Component {
    componentDidMount = () => {
        let ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Price change',
                    data: this.props.data.map(d => d),
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    componentDidUpdate = (prevProps) => {
        console.log(this.props)
        if (this.props.data !== prevProps.data) {
            let ctx = document.getElementById('myChart');

            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    datasets: [{
                        label: 'Price change',
                        data: this.props.data.map(d => d),
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    };

    render() {
        return <canvas id="myChart" width="400" height="400"></canvas>
    }
}
