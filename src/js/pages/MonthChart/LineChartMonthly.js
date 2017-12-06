import React from "react";
import chartjs from 'chart.js'
import { Link } from "react-router-dom";

require('../../../stylesheets/navigation.scss');
require('../../../stylesheets/charts.scss');

export default class LineChartMonthly extends React.Component {

    componentDidMount(){
        this.setUpGraph(document.getElementById("line-chart"));
    }

    componentDidUpdate(){
        console.log('Update..');
        this.setUpGraph(document.getElementById("line-chart"));
    }

    render() {
        console.log('Rendering monthly.');
        return (
            <div>
                <canvas id="line-chart" width="55" height="23"></canvas>
            </div>
        );
    }

    setUpGraph(graphElement){
        var allData = this.props.cardValuesMonthly;
        var dataInFloat = [];
        var dayIndex = [];
        for (var i = 0; i < allData.length; i++) {
            dataInFloat[i] = parseFloat(allData[i]);
            dayIndex[i] = i;
        }

        new Chart(graphElement, {
            type: 'line',
            data: {
                labels: dayIndex,
                datasets: [{
                    data: dataInFloat,
                    label: "Ausgaben",
                    borderColor: "#592485",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Wert in €'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Monate"
                        }
                    }]
                },
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + '€';
                        }
                    }
                }
            }
        });
    }

}