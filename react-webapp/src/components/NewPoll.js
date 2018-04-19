import React, {Component} from 'react';
import {Button, Form, Radio, Grid, Card, Icon, Image, Dropdown } from 'semantic-ui-react'

class NewPoll extends React.Component {

	constructor(props) {
    super(props);

		this.state = {
			vote_definitions: [
				{
					title: 'City Council Seat 1',
					responses: ['guy']
				}
			]
		};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

	on_create = () => {
		console.log('Begin poll creation routine.')
	};

	on_add_vote_definition = () => {
		console.log('adding vote definition!')
		this.setState(prevState => ({
			vote_definitions: prevState.vote_definitions.concat({
				responses: ['new responses']
			})
		}));
	}

	on_add_response = (i) =>  {
		console.log('Adding to vote definition')
		console.log(this.state['vote_definitions'])
		this.setState(prevState => ({
			vote_definitions: prevState['vote_definitions'][i]['responses'].concat('new response')
		}));
		this.forceUpdate()
	};

  render() {
  	return (
		<div>
		  <div className="ui three column grid">
		    <div className="row">
		      <div className="column"></div>
		      <div className="column"></div>
		      <div className="column"></div>
		    </div>
		    <div className="row">
		      <div className="column"></div>
		      <div className="column">
		        <h2 className="ui purple image header">
		          <div className="content">
		            New Poll
		          </div>
		        </h2>
		        <form className="ui large form">
		          <div className="ui stacked segment">
		            <div className="field">
		              <div className="ui left icon input">
		                <i className="person icon"></i>
		                <input type="username" name="poll_id" placeholder="Poll ID"/>
		              </div>
		            </div>
		            <div className="field">
		              <div className="ui left icon input">
		                <i className="person icon"></i>
		                <input type="username" name="dest_account" placeholder="Destination Account"/>
		              </div>
		            </div>
		            <div className="field">
		              <div className="ui left icon input">
		                <i className="person icon"></i>
		                <input type="username" name="vote_title" placeholder="Vote Title"/>
		              </div>
		            </div>
		            <div className="field">
		              <div className="ui left icon input">
		                <i className="person icon"></i>
		                <input type="username" name="start_time" placeholder="Start Time"/>
		              </div>
		            </div>
		            <div className="field">
		              <div className="ui left icon input">
		                <i className="person icon"></i>
		                <input type="username" name="end_time" placeholder="End Time"/>
		              </div>
		            </div>
		            <div className="field">
		            	<h3 className="ui purple image header">
					          <div className="content">
					            Vote Definitions
					          </div>
					        </h3>
			            {this.state.vote_definitions.map((vote_def, vote_index) => 
			            	<div className="field" key ={vote_index}>
			            		<Card>
			            			<Card.Header>
					            		<h3 className="ui purple image header">
									          <div className="content">
									            Definition: {vote_def['responses']}
									          </div>
									        </h3>
								        </Card.Header>
								        <Card.Content>
						            	{Object.entries(vote_def['responses']).map((response,response_index) => (
											      <Grid className="ui two column" key = "response_index">
											      	<div className="column">
													      <div className="ui left icon input">
									                <input type="username" name="start_time" value={response} onChange={this.handleChange}/>
										            </div>
									            </div>
									            <Button className="ui" color='red'>Delete</Button>
									          </Grid>
								          ))}
								        </Card.Content>
						            <div className="field">
						           		{/*<div className="ui fluid submit button" onClick={this.on_add_response(vote_index)}>Add response</div>*/}
						            </div>
					            </Card>
				            </div>
						    	)}
  							<div className="field">
		           		<div className="ui fluid submit button" onClick={this.on_add_vote_definition}>Add vote definition</div>
		            </div>
		            </div>
		            <div className="ui fluid large purple submit button" onClick={this.on_create}>CREATE</div>
		          </div>

		          <div className="ui error message"></div>

		        </form>
		      </div>
		    </div>
		    <div className="column"></div>
		  </div>
		  <div className="row">
		    <div className="column"></div>
		    <div className="column"></div>
		    <div className="column"></div>
		  </div>
	  </div>
		)
	}
}

export default NewPoll;

