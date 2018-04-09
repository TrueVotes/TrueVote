import React, {Component} from 'react'
import {Button, Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'


class VoteCountDashboard extends Component {
	
	state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
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
        </div>
   	)
	}
}

export default VoteCountDashboard