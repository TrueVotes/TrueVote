import React, {Component} from 'react'
import {Button, Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'
import './VoteCountDashboard.css';


class VoteCountDashboard extends Component {
	
	state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {

  	var responses = {
  		'president': {
  			'candidate A': 13,
  			'candidate B': 5,
  			'candidate C': 24,
  			'candidate D': 7
  		},
  		'vice-president': {
  			'candidate E': 38,
  			'candidate F': 21
  		}
  	};

		var ResponseDisplay = () =>
		  <div>{
		    Object.entries(responses).map( ([key, value]) => 
		    	<p><h3>{key}</h3> {
		    		Object.entries(value).map( ([innerkey, innervalue]) =>
		    			<p>{innerkey}: {innervalue}</p> )
		    	}<br></br></p> )
		  }</div>

  	return (
			  <div class="ui three column grid">

					{/*empty row*/}
			    <div class="row">
			      <div class="column"></div>
			      <div class="column"></div>
			      <div class="column"></div>
			    </div>

			  	{/*title*/}
			    <div class="row">
			      <div class="column"></div>
			      <div class="column">
			        <h2 class="ui purple image header">
			          <div class="content">
			            Vote Counts
			          </div>
			        </h2>
		        </div>
	        </div>

		      {/*list*/}
		      <div class="row">
		      	<div class="column"></div>
		      	<div class="column">
		      	<ResponseDisplay />
		        </div>
		      </div>
        </div>
   	)
	}
}

export default VoteCountDashboard