import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';

const Home = () => (
	<div class="ui one centered column grid">
    <div class="row">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
    <div class="row">
    	<div class="ui centered link cards">
			  <div class="card">
			    <div class="content">
			    	<h2 class="ui purple image header">
		          <div class="content">
		            Existing Poll
		          </div>
		        </h2>
			      <div class="ui large form">
			      	<div class="field">
	              <div class="ui left icon input">
	                <i class="person icon"></i>
	                <input type="username" name="first_name" placeholder="Private Station Seed"/>
	              </div>
	            </div>
	            <div class="field">
	              <div class="ui left icon input">
	                <i class="person icon"></i>
	                <input type="username" name="first_name" placeholder="Poll Key"/>
	              </div>
	            </div>
	            <div class="inline fields">
						    <label>Setting:</label>
						    <div class="field">
						      <div class="ui radio checkbox">
						        <input type="radio" name="frequency" checked="checked"/>
						        <label>Vote</label>
						      </div>
						    </div>
						    <div class="field">
						      <div class="ui radio checkbox">
						        <input type="radio" name="frequency"/>
						        <label>Manage</label>
						      </div>
						    </div>
						  </div>
	            <div class="field">
			      		<Link to='/vote'><button class="ui button">Enter</button></Link>
			      	</div>
			      </div>
			    </div>
			    <div class="extra content">
			    </div>
			  </div>
			  <div class="card">
			    <div class="content">
			    	<h2 class="ui purple image header">
		          <div class="content">
		            Create Poll
		          </div>
		        </h2>
			      <div class="ui large form">
	            <div class="field">
			      		<Link to='/newpoll'><button class="ui button">Create</button></Link>
			      	</div>
			      </div>
			    </div>
			    <div class="extra content">
			    </div>
			  </div>
			</div>
    </div>
  </div>
)

export default Home
