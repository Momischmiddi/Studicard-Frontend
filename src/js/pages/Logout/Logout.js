import React from "react"
import { Link } from "react-router-dom";

require('../../../stylesheets/logout.scss');

export default class Login extends React.Component {

    render() {
        return (
            <div>
                <div class="logoutcontainer">
                    <h3>Sicher ausloggen?</h3>
                    <div>
                        <Link to="login">
                            <button type="button" class="btn btn-primary">Ausloggen</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}