import React from "react";
import {connect} from "react-redux"

import {setScanDetails, fetchDetails} from "../../actions/showScanDetailsActions"

@connect((store) => {
    return {
        scanDetails: store.showScanDetails.scanDetails,
        fetched: store.showScanDetails.fetched
    };
})

export default class LastTransactionAtTime extends React.Component {

    render() {
        return (
            <div>
                {this.props.fetched ?
                    <h2>Letzte Abbuchung zu dieser Zeit: {this.props.scanDetails.scanDetails.lastTransaction}</h2>
                    :
                    <h1></h1>
                }
            </div>
        );
    }
}