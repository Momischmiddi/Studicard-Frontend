import React from "react";
import {connect} from "react-redux"

import BarChart from "../../components/BarChart"

export default class Statistics extends React.Component {

    render() {
        return (
            <div>
                <BarChart cardStatistics={this.props.cardStatistics.cardStatistics}/>
            </div>
        );
    }
}