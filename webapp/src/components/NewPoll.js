import React, {Component} from 'react'
import {Button, Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'


class NewPoll extends Component {
	
	state = {}
	handleChange = (e, { value }) => this.setState({ value })

  poll_operators = [{'title': 'dude', 'type': 'NUMERIC'}]

	render() {
		return (
			<div>
			  <div class="ui column grid">
			    <div class="row">
			      <div class="column"></div>
			    </div>
			    <div class="row">
			      <div class="column">
			        <h2 class="ui purple image header">
			          <div class="content">
			            Create New Poll
			          </div>
			        </h2>
			        <form class="ui large form">
			          <div class="ui stacked segment">
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Name"/>
			              </div>
			            </div>
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Destination Account"/>
			              </div>
			            </div>
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Start Time"/>
			              </div>
			            </div>
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="End Time"/>
			              </div>
			            </div>
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Min Responses"/>
			              </div>
			            </div>
			            <div class="field">
			              <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Max Responses"/>
			              </div>
			            </div>
			            {this.poll_operators.map(option => 
			            	<div class="inline fields"> 
			            		<label>{option["title"]}</label>
			            		<label>{option["type"]}</label>
			            		<Button icon='close'>
								      	
								      </Button>
			            	</div>
			            )} 
			            <div class="inline fields">
								    <label>Setting:</label>
								    <div class="ui left icon input">
			                <i class="person icon"></i>
			                <input type="username" name="first_name" placeholder="Title"/>
			                <input type="username" name="first_name" placeholder="Type"/>
			              </div>
								    <div class="field">
								      <Button>
								      	Add
								      </Button>
								    </div>
			            </div>
			            <div class="ui fluid large purple submit button">Generate</div>
			          </div>

			          <div class="ui error message"></div>

			        </form>
			      </div>
			    </div>
			  </div>
			  <div class="row">
			    <div class="column"></div>
			  </div>
		  </div>
		)
	}
}
export default NewPoll