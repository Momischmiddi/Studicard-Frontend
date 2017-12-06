import React from "react";
import {connect} from "react-redux"
import GuthabenValue from "./GuthabenData"

import {setCardValue, fetchValue} from "../../actions/getCardValueActions"

require('../../../stylesheets/guthaben.scss');

@connect((store) => {
    return {
        cardValue: store.getCardValue.cardValue,
        fetched: store.getCardValue.fetched
    };
})

export default class GuthabenData extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchValue());
    }

    render() {
        return (
            <div>
                {this.props.fetched ?
                    <GuthabenValue cardValue = {this.props.cardValue}/>
                    :
                    <h1>Loading..</h1>
                }
            </div>
        );
    }
}