import React from "react";
import chartjs from 'chart.js'
import { Link } from "react-router-dom";

require('../../../stylesheets/navigation.scss');
require('../../../stylesheets/charts.scss');

export default class LineChart extends React.Component {

    componentDidMount(){
        this.setUpGraph(document.getElementById("line-chart"));
    }

    render() {
        return (
            <div>
              <div class="centertext">
                <h4>Alle Abbuchungen</h4>
                  {this.props.cardValueTotalHistory ?
                      <h4>Insgesamt {this.props.cardValueTotalHistory.totalValue}€ bei {this.props.cardValueTotalHistory.transactionAmount} Abbuchungen</h4>
                        :
                      <h4>Loading</h4>
                  }
              </div>
                <canvas id="line-chart" width="55" height="23"></canvas>
            </div>
        );
    }

    setUpGraph(graphElement){
        var allData = this.props.cardValueTotalHistory.totalHistory;
        var dataInFloat = [];
        var allLabels = [];
        
        console.log('In alldata: ' , allData);
        for (var i = 0; i < allData.length; i++) {
            dataInFloat[i] = parseFloat(allData[i]);
            allLabels[i] = i;
        }

        new Chart(graphElement, {
            type: 'line',
            data: {
                labels: allLabels,
                datasets: [{
                    data: dataInFloat,
                    label: "Abbuchung",
                    borderColor: "#592485",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true
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
                            labelString: "Abbuchungen"
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