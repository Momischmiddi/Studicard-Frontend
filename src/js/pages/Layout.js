import React from "react"
import {HashRouter, Route, Link} from 'react-router-dom';
import Login from "./Login/Login"
import NavigationBar from "../components/NavigationBar";

require('../../stylesheets/_all.scss');

/**
 * Main view which builds up the whole website, starting with the login.
 */
export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            showMainView: false
        };
    }

    openMainView(){
        this.setState({showMainView: true});
    }

    render() {
        return (
            <HashRouter>
                {this.state.showMainView ?
                    <NavigationBar />
                :
                    <Login openMainView={this.openMainView.bind(this)}/>
                }
            </HashRouter>
        );
    }
}