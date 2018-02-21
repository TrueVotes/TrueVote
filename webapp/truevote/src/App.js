import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">TRUE VOTE</h1>
          </header>
          <Card>
            <CardTitle title="Catalanian Referendum" subtitle="Secession from the Spanish State" />
            <CardText>
              Identity Information <br/><br/>
              Vote
            </CardText>
            <CardActions>
              <FlatButton label="Vote" />
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
