import React from "react"
import { Link } from "react-router-dom";
import {connect} from "react-redux"
require('../../../../stylesheets/login.scss');

import {setLoginRequest, fetchLogin} from "../../../actions/sendLoginRequestActions"

@connect((store) => {
    return {
        loginResponse: store.sendLoginRequest.loginResponse,
        fetched: store.sendLoginRequest.fetched
    };
})

export default class LoginCenter extends React.Component {

    sendLoginRequest(cardId){
        this.props.dispatch(fetchLogin(cardId));
    }

    constructor() {
        super();
        this.state = {
            isLoggingIn: false
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("click", this.handleClick.bind(this));
        document.getElementById('logintextfield').focus();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
        document.removeEventListener("click", this.handleClick.bind(this));
    }

    render() {
        var isLoggedIn = false;
        if(this.props.fetched){
            isLoggedIn = this.props.loginResponse.loginResponse;
            if(!isLoggedIn){
                this.showToast("Bevor Sie diese Seite verwenden können, <br>müssen Sie sich an einem NFC-Terminal registrieren");
            }else{
                this.props.openMainView();
            }
        }


        return (
            <div class="centerdiv">
                <div class="logindiv">
                    <div class ="textfielddiv">
                        <span class="glyphicon glyphicon-info-sign" onClick={this.showModalDialog.bind(this)}></span>
                        <input id="logintextfield" onFocus={this.clearTextfield.bind(this)} type="text" placeholder="Studicard-ID" class="form-control"/>
                    </div>
                    {this.props.fetching ?
                        <button type="button" class="btn">
                            <img height="42" width="42" src="../../../Images/Loading.gif"/>
                        </button>
                        :
                        <button type="button" href="#guthaben" onClick={this.handleLogin.bind(this)} class="btn">Login</button>
                    }
                </div>
            </div>
        );
    }

    handleClick(event){
        var clickedElement = event.target.id;
        console.log('Clicked ist: ' , clickedElement);
        if(clickedElement != 'modaltext' && clickedElement != ''){
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
        }
    }

    handleKeyDown(event){
        var activeId = document.activeElement.id;
        if(event.keyCode == 13 && activeId == 'logintextfield'){
            this.handleLogin();
        }
    }

    handleLogin(){
        var cardIdTextField = document.getElementById("logintextfield");
        if(this.isValidLoginData(cardIdTextField)){
            this.sendLoginRequest(cardIdTextField.value);
        }else{
            this.showToast("Keine valide Login-ID");
        }
    }

    isValidLoginData(cardIdTextField){
        var isValidLogin = true;
        var cardId = cardIdTextField.value;
        if(isNaN(cardId) || cardId.length < 1){
            isValidLogin = false;
        }

        return isValidLogin;
    }

    clearTextfield(textField){
        var cardIdTextField = document.getElementById("logintextfield");
        cardIdTextField.value = "";
        cardIdTextField.style.border ="solid 1px black";
        cardIdTextField.style.color ="#9999b3";
    }

    showModalDialog(){
        var modal = document.getElementById('myModal');
        var modalText = document.getElementById('modaltext');
        modalText.innerHTML = "Diese ID befindet sich auf Ihrer Studentenkarte. </br>";
        modalText.innerHTML += "Sie können sie entweder an einem NFC-Terminal</br>";
        modalText.innerHTML += "oder mit <a href='../../../Downloads/Test'>unserer Android App</a> auslesen.</br></br>";
        modalText.innerHTML += "Diese App benötigt ein NFC-Lesefähiges Smartphone.</br>";
        modalText.style.textAlign = "center";
        modal.style.display = "block";
    }

    showToast(errorMessage){
        var snackBarElem = document.getElementById("snackbar");
        snackBarElem.innerHTML = errorMessage;
        snackBarElem.className = "show";
        setTimeout(function(){ snackBarElem.className = snackBarElem.className.replace("show", ""); }, 3000);
    }
}