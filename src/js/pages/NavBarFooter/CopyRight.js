import React from "react"

require('../../../stylesheets/copyright.scss');

export default class CopyRight extends React.Component {

    render() {
        return (
            <div>
                <div class="developerinfo">
                    &copy; Copyright 2017, Moritz Schmidt
                </div>
            </div>
        );
    }
}