import React from "react";
import {connect} from "react-redux"
import LineChartTotalHistory from "../TotalHistoryChart/LineChartTotalHistory"

import {setCardValueTotalHistory, fetchTotalHistory} from "../../actions/getCardValuesTotalHistoryActions"

@connect((store) => {
    return {
        cardValueTotalHistory: store.getCardValueTotalHistory.cardValueTotalHistory,
        fetched: store.getCardValueTotalHistory.fetched
    };
})

export default class TotalHistory extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchTotalHistory());
    }

    render() {
        return (
            <div>
                {this.props.fetched ?
                    <LineChartTotalHistory cardValueTotalHistory={this.props.cardValueTotalHistory.cardValueTotalHistory}/>
                    :
                    <h1>Loading..</h1>
                }
            </div>
        );
    }
}