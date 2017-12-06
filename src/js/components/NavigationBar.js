import React from "react";
import { Link } from "react-router-dom";
import LineChart from "./LineChart";
import LineChartTotalYear from "../pages/TotalYearChart/LineChartTotalYear";
import Guthaben from "../pages/Guthaben/Guthaben"
import CopyRight from "../pages/NavBarFooter/CopyRight"
import Statistics from "../pages/Statistics/Comparison"
import TotalYear from "../pages/TotalYearChart/TotalYear"
import TotalHistory from "../pages/TotalHistoryChart/TotalHistory"
import Logout from "../pages/Logout/Logout"
import AllScans from "../pages/AllScans/AllScans"
import Monthly from "../pages/MonthChart/Monthly"
require('../../stylesheets/navigation.scss');

export default class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
        collapsed: true,
        showEntry: null,
        showLogoutView: false
    };
  }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

  // Als erstes wird immer das Guthaben angezeigt. Darum hier gleich Request raus.
  componentWillMount() {
      this.showCardValue();
  }

  componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("click", this.handleClick.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown.bind(this));
      document.removeEventListener("click", this.handleClick.bind(this));
  }

  showCardValue(){
    this.setState({showEntry : "value"});
  }

  showStatistics(e){
      this.setState({showEntry : e.target.id});
  }

  showLineChartStatistics(e){
      if(e.target.id == "year") {
          var chartData = this.createChartDataForYear(e);
      }else if(e.target.id == "total"){
          var chartData = this.createChartDataForTotal(e);
      }else{
          var chartData = this.createChartDataForMonth(e);
      }
      this.setState({chartData : chartData});
  }

    showAllScans(e){
      this.setState({showEntry : "allscans"});
    }

  render() {
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";
    var navToShow = this.state.showEntry;
    return (
        <div>
            <div id="infomodal" class="infomodal">
                <div class="infomodal-content">
                    <span class="close" onClick={this.closeModalDialog.bind(this)}>&times;</span>
                    <p id="infomodaltext"></p>
                </div>
            </div>
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar" />
                            <span class="icon-bar" />
                            <span class="icon-bar" />
                        </button>
                    </div>
                </div>
                <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <Link to="guthaben" class="valuenav" id="value" onClick={this.showCardValue.bind(this)}>Guthaben</Link>
                        </li>
                        <li>
                            <Link to="vergleich" class="statistnav" id="statistics" onClick={this.showStatistics.bind(this)}>Vergleich</Link>
                        </li>
                        <li>
                            <Link to="jahresausgaben" class="yearnav" id="year" onClick={this.showLineChartStatistics.bind(this)}>Jahresausgaben</Link>
                        </li>
                        <li>
                            <Link to="uebersicht" class="totalnav" id="total" onClick={this.showLineChartStatistics.bind(this)}>Gesamte Abbuchungsübersicht</Link>
                        </li>
                        <li>
                            <Link to="Alle Scans" class="allscans" id="allscans" onClick={this.showAllScans.bind(this)}>Alle Karten-Scans</Link>
                        </li>
                        <li class="dropdown" onMouseOver={this.showDropDown.bind(this)}>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#monatsausgaben">Monatsausgaben <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#jan" onClick={this.showLineChartStatistics.bind(this)} id="januar">Januar</a></li>
                                <li><a href="#feb" onClick={this.showLineChartStatistics.bind(this)} id="februar">Februar</a></li>
                                <li><a href="#mar" onClick={this.showLineChartStatistics.bind(this)} id="maerz">März</a></li>
                                <li><a href="#apr" onClick={this.showLineChartStatistics.bind(this)} id="april">April</a></li>
                                <li><a href="#mai" onClick={this.showLineChartStatistics.bind(this)} id="mai">Mai</a></li>
                                <li><a href="#juny" onClick={this.showLineChartStatistics.bind(this)} id="juni">Juni</a></li>
                                <li><a href="#july" onClick={this.showLineChartStatistics.bind(this)} id="juli">Juli</a></li>
                                <li><a href="#aug" onClick={this.showLineChartStatistics.bind(this)} id="august">August</a></li>
                                <li><a href="#sept" onClick={this.showLineChartStatistics.bind(this)} id="september">September</a></li>
                                <li><a href="#oct" onClick={this.showLineChartStatistics.bind(this)} id="oktober">Oktober</a></li>
                                <li><a href="#nov" onClick={this.showLineChartStatistics.bind(this)} id="november">November</a></li>
                                <li><a href="#dec" onClick={this.showLineChartStatistics.bind(this)} id="dezember">Dezember</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li onClick={this.showInfoDialoge.bind(this)}><a href="#info"><span class="glyphicon glyphicon-info-sign"></span> Info</a></li>
                        <li class="logoutnavbar"><a href="#logout" onClick={this.showLogoutView.bind(this)}><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </div>
            </nav>
            <div class="maincontent">
                {this.state.showEntry == "value" ?
                    <Guthaben cardData={this.state.cardData}/>
                    :
                    this.state.showEntry == "statistics" ?
                        <Statistics />
                        :
                        this.state.showEntry == "month" ?
                            <Monthly chartData={this.state.chartData}/>
                            :
                            this.state.showEntry == "year" ?
                                <TotalYear />
                                :
                                this.state.showEntry == "total" ?
                                    <TotalHistory />
                                    :
                                    this.state.showEntry == "logout" ?
                                        <Logout />
                                        :
                                        this.state.showEntry == "allscans" ?
                                            <AllScans />
                                            :
                                            <Guthaben />
                }
            </div>
            <CopyRight />
        </div>
    );
  }

    showDropDown(e){
        var dropDown = document.getElementsByClassName('dropdown-menu')[0];
        dropDown.style.visibility = "visible";
    }

    showLogoutView(){
        this.setState({showEntry : "logout"});
    }

    createChartDataForMonth(e){
        var header = "Übersicht des ";
        if(e.target.id == "maerz"){
            header += "Monats März";
        }else{
            // Ersten Buchstaben des Monats groß machen.
            header += "Monats " + e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)
        }

        var shouldBeReRendered = false;

        if(this.state.showEntry == 'month'){ // If month was already rendered, pass a rerender flag.
            shouldBeReRendered = true;
        }
        this.setState({showEntry : "month"});
        // Dropdown ausblenden.
        var dropDown = document.getElementsByClassName('dropdown-menu')[0];
        dropDown.style.visibility = "hidden";

        var chartData = {
            title: header,
            month: e.target.id,
            shouldBeReRendered: shouldBeReRendered
        }

        return chartData;
    }

    createChartDataForYear(e){
        var header = "Übersicht des ";
        header += "Jahres";
        this.setState({showEntry : "year"});

        var chartData = {
            title: header,
            xAxis: "Monate",
            labels: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober", "November", "Dezember"],
        }

        return chartData;
    }

    createChartDataForTotal(e){
        var header = "Gesamtübersicht";
        this.setState({showEntry : "total"});

        var chartData = {
            title: header,
            xAxis: "Abbuchungen",
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ],
            cardValueData : [2.30, 1.20, 2.40, 3.10, 0.12, 3.80, 2.12, 3.30, 1.40, 1.25, 1.10, 0.06, 0.90, 1.15, 3.20],
            lastTransactionData : [0.44, 6.80, 12.80, 5.60, 33.24, 5.36, 6.80, 6.15, 21.40, 2.55, 11.20, 12.40]
        }

        return chartData;
    }

    showInfoDialoge(){
        var modal = document.getElementById('infomodal');
        var modalText = document.getElementById('infomodaltext');
        modalText.innerHTML = "Alle Statistiken dieser Website sind davon abhängig, </br>";
        modalText.innerHTML += "wie oft Sie Ihren Studentenausweis an einem NFC-Terminal einlesen.</br>";
        modalText.innerHTML += "Das alleinige Bezahlen in der Mensa oder am Drucker hat keinen Einfluss auf die Statistik.";
        modalText.style.textAlign = "center";
        modal.style.display = "block";
    }

    closeModalDialog(){
        var modal = document.getElementById('infomodal');
        modal.style.display = "none";
    }



    handleKeyDown(event){
        var modal = document.getElementById('infomodal');
        if(modal.style.display == "block"){
            if(event.keyCode == 27) {   // Bei Escape modal dialog schliessen.
                modal.style.display = "none";
            }
        }
    }

    handleClick(event){
        var clickedElement = event.target.id;
        console.log('Clicked ist: ' , clickedElement);
        if(clickedElement != 'infomodaltext' && clickedElement != ''){
            var modal = document.getElementById('infomodal');
            modal.style.display = "none";
        }
    }
}