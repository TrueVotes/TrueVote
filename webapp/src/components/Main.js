import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Landing from './Landing'
import NewPoll from './NewPoll'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
  	<BrowserRouter>
	    <Switch>
	      <Route exact path='/' component={Home}/>
	      <Route path='/landing' component={Landing}/>
	      <Route path='/newpoll' component={NewPoll}/>
	    </Switch>
    </BrowserRouter>
  </main>
)

export default Main
