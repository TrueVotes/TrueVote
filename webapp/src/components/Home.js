import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';

const Home = () => (
	<div class="ui one centered column grid">

		{/*empty row*/}
    <div class="row">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>

    <div class="row">
    	<div class="ui centered link cards">

    		{/*create new poll*/}
			  <div class="card">
			    <div class="content">
			    	<h2 class="ui purple image header">
		          <div class="content">
<<<<<<< HEAD
		            Existing Poll
=======
		            Create New Poll
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

				{/*set up polling station*/}
			  <div class="card">
			    <div class="content">
			    	<h2 class="ui purple image header">
		          <div class="content">
		            Set Up Polling Station
>>>>>>> origin/master
		          </div>
		        </h2>
			      <div class="ui large form">
			      	<div class="field">
	              <div class="ui left icon input">
	                <i class="person icon"></i>
	                <input type="username" name="first_name" placeholder="IOTA Wallet Seed"/>
	              </div>
	            </div>
	            <div class="field">
	              <div class="ui left icon input">
	                <i class="person icon"></i>
	                <input type="username" name="first_name" placeholder="Poll Key"/>
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

				{/*count votes*/}
			  <div class="card">
			    <div class="content">
			    	<h2 class="ui purple image header">
		          <div class="content">
		            Count Votes
		          </div>
		        </h2>
			      <div class="ui large form">
			      	<div class="field">
	              <div class="ui left icon input">
	                <i class="person icon"></i>
	                <input type="username" name="first_name" placeholder="Private Key"/>
	              </div>
	            </div>
	            <div class="field">
			      		<Link to='/votecountdashboard'><button class="ui button">Start</button></Link>
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
