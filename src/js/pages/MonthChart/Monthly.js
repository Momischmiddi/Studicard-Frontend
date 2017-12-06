import React from "react";
import {connect} from "react-redux"
import LineChartMonthly from "../MonthChart/LineChartMonthly"

import {setCardValueMonthly, fetchMonthly} from "../../actions/getMonthlyStatisticsActions"

@connect((store) => {
    return {
        cardValueMonthly: store.getCardValueMonthly.cardValueMonthly,
        fetched: store.getCardValueMonthly.fetched
    };
})

export default class Monthly extends React.Component {

    componentDidMount() {
        var monthIndex = this.mapMonthStringToMonthIndex(this.props.chartData.month);
        this.props.dispatch(fetchMonthly(monthIndex));
    }

    requestMonthlyData(){
        var monthIndex = this.mapMonthStringToMonthIndex(this.props.chartData.month);
        this.props.dispatch(fetchMonthly(monthIndex));
    }

    render() {
        if(this.props.chartData.shouldBeReRendered){
            var oldChartData = this.props.chartData;
            oldChartData.shouldBeReRendered = false;
            this.setState({chartData: oldChartData});
            this.requestMonthlyData();
        }

        return (
            <div>
                <div class="centertext">
                    <h4>{this.props.chartData.title}</h4>
                </div>
                {this.props.fetched ?
                    <LineChartMonthly cardValuesMonthly={this.props.cardValueMonthly.cardValueMonthly.monthlyStatistics}/>
                    :
                    <h1>Loading..</h1>
                }
            </div>
        );
    }

    mapMonthStringToMonthIndex(monthString){
        switch(monthString){
            case "januar":
                return 0;
            case "februar":
                return 1;
            case "maerz":
                return 2;
            case "april":
                return 3;
            case "mai":
                return 4;
            case "juni":
                return 5;
            case "juli":
                return 6;
            case "august":
                return 7;
            case "september":
                return 8;
            case "oktober":
                return 9;
            case "november":
                return 10;
            case "dezember":
                return 11;
            default:
                return 0;
        }
    }
}