import React from "react";
import {connect} from "react-redux"

import {setScanDetails, fetchDetails} from "../../actions/showScanDetailsActions"

require('../../../stylesheets/allscanlist.scss');

@connect((store) => {
    return {
        scanDetails: store.showScanDetails.scanDetails,
        fetched: store.showScanDetails.fetched
    };
})


export default class AllScanList extends React.Component {

    render() {
        const {scanDate} = this.props;

        return (
            <div class="scandata" onClick={this.showDetails.bind(this)}>
                <label>
                    <h4 id="scandate">{scanDate}</h4>
                </label>
            </div>
        );
    }

    showDetails(e){
        var clickedDate = e.target.childNodes[0].textContent;
        this.props.dispatch(fetchDetails(clickedDate));
    }
}