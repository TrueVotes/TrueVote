import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import Main from './components/Main'
import {Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'


class App extends Component {
  render() {
    return (
    <div class="App">
      <div class="ui attached stackable menu">
        <div class="ui container">
          <a class="item">
            <i class="home icon"></i> Vote
          </a>
          <a class="item">
            <i class="grid layout icon"></i> Start Poll
          </a>
        </div>
      </div>
      <Main />
    </div>
    );
  }
}

export default App;
