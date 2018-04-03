import React, {Component} from 'react';
import {Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'

class Landing extends Component {

	state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
  	return (
		<div>
		  <div class="ui three column grid">
		    <div class="row">
		      <div class="column"></div>
		      <div class="column"></div>
		      <div class="column"></div>
		    </div>
		    <div class="row">
		      <div class="column"></div>
		      <div class="column">
		        <h2 class="ui purple image header">
		          <div class="content">
		            Enter Citizen Information
		          </div>
		        </h2>
		        <form class="ui large form">
		          <div class="ui stacked segment">
		            <div class="field">
		              <div class="ui left icon input">
		                <i class="person icon"></i>
		                <input type="username" name="first_name" placeholder="First Name"/>
		              </div>
		            </div>
		            <div class="field">
		              <div class="ui left icon input">
		                <i class="person icon"></i>
		                <input type="username" name="first_name" placeholder="Last Name"/>
		              </div>
		            </div>
		            <div class="field">
		              <div class="ui left icon input">
		                <i class="person icon"></i>
		                <input type="username" name="first_name" placeholder="License ID"/>
		              </div>
		            </div>
		            <div class="field">
		              <div class="ui left icon input">
		                <i class="person icon"></i>
		                <input type="username" name="first_name" placeholder="Vote"/>
		              </div>
		            </div>
		            <div class="ui row grid centered">
		              <Form.Field style={{margin:20}}>
		                <Radio
		                  label='Mugabe'
		                  name='radioGroup'
		                  value='this'
		                  checked={this.state.value === 'this'}
		                  onChange={this.handleChange}
		                />
		              </Form.Field>
		              <Form.Field style={{margin:20}}>
		                <Radio
		                  label='Incumbent'
		                  name='radioGroup'
		                  value='that'
		                  checked={this.state.value === 'that'}
		                  onChange={this.handleChange}
		                />
		              </Form.Field>
		            </div>
		            <div class="ui fluid large purple submit button">Login</div>
		          </div>

		          <div class="ui error message"></div>

		        </form>
		      </div>
		    </div>
		    <div class="column"></div>
		  </div>
		  <div class="row">
		    <div class="column"></div>
		    <div class="column"></div>
		    <div class="column"></div>
		  </div>
	  </div>
		)
	}
}

export default Landing;

