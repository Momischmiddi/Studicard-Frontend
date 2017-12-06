import React from "react";

require('../../../stylesheets/guthaben.scss');

export default class Guthaben extends React.Component {
  render() {
      var cardValue = this.props.cardValue.cardValue.cardValue;
      var lastTransaction = this.props.cardValue.cardValue.lastTransaction;
      return (
        <div>
            <div class="header">
                <h1>Studicard Statistik-Portal</h1>
                <h1><span class="glyphicon glyphicon-credit-card"></span></h1>
            </div>
            <div class="uppertext">
                <h4>Das letzte mal, an dem Sie Ihren Studentenausweis an einem</h4><br></br>
            </div>
            <div class="lowertext">
                <h4>NFC-Terminal eingelesen haben, war am 29.11.2017</h4>
            </div>
            <div class="leftcontainer">
                <h2 style={{fontWeight: '400'}}>Ihr Guthaben:</h2>
                <h3 style={{marginTop: '15px'}}>{cardValue}€</h3>
            </div>
            <div class="rightcontainer">
                <h2 style={{fontWeight: '400'}}>Ihre letzte Abbuchung:</h2>
                <h3 style={{marginTop: '15px'}}>{lastTransaction}€</h3>
            </div>
            <div class="info">
                <div class="uppertext">
                    Nicht aktuell? aktuallisieren Sie Ihre Statistik,<br></br>
                </div>
                <div class="lowertext" style={{marginTop: '5px'}}>
                    indem Sie Ihren Studentenausweis an einem NFC-Terminal scannen.
                </div>
            </div>
        </div>
    );
  }
}