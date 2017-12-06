import React from "react";
import {connect} from "react-redux"
import AllScanList from "../AllScans/AllScanList";
import ValueAtTimeView from "../AllScans/ValueAtTimeView";
import LastTransactionAtTime from "../AllScans/LastTransactionAtTime";


require('../../../stylesheets/allscans.scss');

export default class AllScans extends React.Component {

    componentWillMount(){
        this.requestAllScans();
    }

    render() {
        return (
            <div>
                <div class="leftcontent">
                    <div class="scanlist">
                        <h3>Wählen Sie ein Datum</h3>
                        {this.state && this.state.scanDates ?
                            <div class="pre-scrollable" style={{overflowX: "hidden", maxHeight: "450px"}}>
                                <div class="row" style={{width: "250px"}}>{this.state.scanDates.map((scanDate, i) => <AllScanList key={i} scanDate={scanDate}/>)}</div>
                            </div>
                            :
                            <h3>Loading..</h3>
                        }
                    </div>
                </div>
                <div class="rightcontent">
                    <div class="values">
                        <ValueAtTimeView />
                    </div>
                    <div class="lasttransactions">
                        <LastTransactionAtTime />
                    </div>
                </div>
            </div>
        );
    }

    requestAllScans(){
        return fetch('http://localhost:3001/carddata/getalltransactiondates', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(response => {
            response.json().then(json => {
                this.setState({scanDates : json});
            });
        });
    }
}