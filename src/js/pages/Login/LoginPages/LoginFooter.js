import React from "react"

require('../../../../stylesheets/login.scss');

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <div class="loginpage" onClick={this.downloadApk.bind(this)}>
                    <label class ="loginlabel">Studicard-ID Reader App für Android</label>
                    <label class="glyphicon glyphicon-download"/>
                </div>
                <div id="snackbar"></div>
            </div>
        );
    }

    downloadApk(){
        window.open('../../../Downloads/Test');
    }
}