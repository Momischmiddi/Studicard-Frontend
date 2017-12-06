import React from "react";
import chartjs from 'chart.js'
import { Link } from "react-router-dom";

require('../../../stylesheets/navigation.scss');
require('../../../stylesheets/charts.scss');

export default class LineChartTotalYear extends React.Component {

    componentDidMount(){
        this.setUpGraph(document.getElementById("line-chart"));
    }

    render() {
        return (
            <div>
              <div class="centertext">
                <h4>Ausgaben dieses Jahr</h4>
              </div>
                <canvas id="line-chart" width="55" height="23"></canvas>
            </div>
        );
    }

    setUpGraph(graphElement){
        var allData = this.props.allCardValuesThisYear.allcardvaluesthisyear;
        var dataInFloat = [];
        console.log('In alldata: ' , allData);
        for (var i = 0; i < allData.length; i++) {
            dataInFloat[i] = parseFloat(allData[i]);
        }

        new Chart(graphElement, {
            type: 'line',
            data: {
                labels: ["Januar", "Februar", "März", "April", "Mai","Juni","Juli","August","September","Oktober","November","Dezember",],
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