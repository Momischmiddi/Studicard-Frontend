import React from "react";
import {connect} from "react-redux"
import StatisticsBody from "./ComparisonBody";

require('../../../stylesheets/guthaben.scss');
import {setCardStatistics, fetchStatistics} from "../../actions/getCardStatisticsActions"

@connect((store) => {
    return {
        cardStatistics: store.getCardStatistics.cardStatistics,
        fetched: store.getCardStatistics.fetched
    };
})

export default class Statistics extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.dispatch(fetchStatistics());
    }

    render() {
        return (
            <div>
                {this.props.fetched ?
                    <StatisticsBody cardStatistics={this.props.cardStatistics}/>
                    :
                    <h1>Loading..</h1>
                }
            </div>
        );
    }
}