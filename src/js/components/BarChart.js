import React from "react";
import chartjs from 'chart.js'
import { Link } from "react-router-dom";

require('../../stylesheets/navigation.scss');
require('../../stylesheets/charts.scss');

export default class LineChart extends React.Component {

    componentDidMount() {
        this.setUpGraph(document.getElementById("bar-chart-grouped"));
    }

    render() {
        var graph = document.getElementById("bar-chart-grouped");
        if(graph != null){
            this.setUpGraph(graph);
        }

        return (
            <div>
              <div>
                  <div style={{width: '950px', height: '450px', display: 'inline-block'}}>
                      <canvas id="bar-chart-grouped" width="800" height="450"></canvas>
                  </div>
              </div>
            </div>
        );
    }

    setUpGraph(graphElement){
        var cardStatistics = this.props.cardStatistics;

        new Chart(graphElement, {
            type: 'bar',
            data: {
                labels: ["Heute", "Diesen Monat", "Dieses Jahr", "Gesamt"],
                datasets: [
                    {
                        label: "Sie",
                        backgroundColor: "#8e5ea2",
                        data: [cardStatistics.spentToday, cardStatistics.spentThisMonth, cardStatistics.spentThisYear, cardStatistics.spentTotal]
                    }, {
                        label: "Andere",
                        backgroundColor: "#3e95cd",
                        data: [cardStatistics.averageSpentTodayOthers, cardStatistics.averageSpentThisMonthOthers, cardStatistics.averageSpentThisYearOthers, cardStatistics.averageSpentTotal]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Ihre Ausgaben im Vergleich zu anderen Studenten (Durchschnitt). Karten im Sytem: ' + cardStatistics.cardsInDataBase,
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
                            labelString: 'Zeitintervall'
                        }
                    }]
                }
            }
        });
    }
}