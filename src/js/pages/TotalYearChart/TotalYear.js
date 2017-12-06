import React from "react";
import {connect} from "react-redux"
import LineChartTotalYear from "../TotalYearChart/LineChartTotalYear"

import {setCardValue, fetchValue, fetchValueThisYear} from "../../actions/getCardValuesThisYearActions"

@connect((store) => {
    return {
        cardValueThisYear: store.getCardValueThisYear.cardValueThisYear,
        fetched: store.getCardValueThisYear.fetched
    };
})

export default class TotalYear extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchValueThisYear());
    }

    render() {
        return (
            <div>
                {this.props.fetched ?
                    <LineChartTotalYear allCardValuesThisYear={this.props.cardValueThisYear.cardValueThisYear}/>
                    :
                    <h1>Loading..</h1>
                }
            </div>
        );
    }
}