import React from "react"
import LoginFooter from "./LoginPages/LoginFooter"
import LoginCenter from "./LoginPages/LoginCenter"

require('../../../stylesheets/login.scss');

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggingIn: false
        };
    }

    /**Callback function from Login-Center to Login.**/
    openMainView(){
        this.props.openMainView();
    }

    render() {
        return (
            <div>
                <div class="welcomediv">
                    <h1>Studicard Statistik-Portal</h1>
                </div>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close" onClick={this.closeModalDialog.bind(this)}>&times;</span>
                        <p id="modaltext"></p>
                    </div>
                </div>
                <LoginCenter openMainView={this.openMainView.bind(this)}/>
                <LoginFooter />
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event){
        var modal = document.getElementById('myModal');
        if(modal.style.display == "block"){
            if(event.keyCode == 27) {   // Bei Escape modal dialog schliessen.
                modal.style.display = "none";
            }
        }
    }

    closeModalDialog(){
        console.log('Closing dialoge..');
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }
}