import React from "react";
import chartjs from 'chart.js'
import { Link } from "react-router-dom";

require('../../stylesheets/navigation.scss');
require('../../stylesheets/charts.scss');

export default class LineChart extends React.Component {

    componentDidMount() {
        this.setUpGraph(document.getElementById("line-chart"));
    }

    render() {
        var graph = document.getElementById("line-chart");
        if(graph != null){  // Ruft man 2 mal Monat hintereinander auf, muss man das Diagramm hier bauen, da die view ja schon existiert.
            this.setUpGraph(graph);
        }

        return (
            <div>
              <div class="centertext">
                <h4>{this.props.chartData.title}</h4>
              </div>
              <canvas id="line-chart" width="55" height="23"></canvas>
            </div>
        );
    }

    setUpGraph(graphElement){
        var chartData = this.props.chartData;
        new Chart(graphElement, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.cardValueData,
                    label: "Guthaben",
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
                            labelString: chartData.xAxis
                        }
                    }]
                }
            }
        });
    }

}