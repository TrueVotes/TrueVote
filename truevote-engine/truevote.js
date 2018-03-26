var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: `http://eugene.iota.community:14265` })

/**
 * This is just a test to make sure we're connecting to the node. Also
 * let's us get information on said iota node.
 */
exports.node_info_test = function() {
	iota.api.getNodeInfo(function(error, success) {
	    if (error) {
	        console.error(error);
	    } else {
	        console.log(success);
	    }
	});
}

/**
 * Will attach a new transfer to the tangle.
 *
 * @param {string} destination_account - destination account ID
 * @param {string} message - message to attach to transfer with the data
 */
exports.attachToTangle = function(destination_account, message) {
  console.log('Beginning attachToTangle function.')
}

/**
 * Will query the tangle.
 *
 * TODO: figure out parameters!!!
 */
exports.queryTangle = function() {
  console.log('Beginning attachToTangle function.')
}


/**
 * Will initialize poll based on the data entered into a template JSON file
 * of the poll initialization metadata described in the section above. This
 * function parses the template and calls the initializePoll() function below.
 *
 * @params {string} path - the relative path to the filled in template
 */
exports.initializePollFromTemplate = function(path) {
  console.log('Beginning initializePollFromTemplate function.')
}

/**
 * Will initialize a poll by ensuring poll metadata is valid (by calling the      
 * ensureUniquePollID() function below) and attaching the message to the tangle.
 *
 * @param {string} poll_id - a unique identifier for the poll
 * @param {int} destination_account - the account ID of to which to send votes
 * @param {VoteDefinition[]} vote_definitions - the list of vote definitions
 * @param {Date} start_time - the start date & time for poll to open
 * @param {Date} end_time - the end date & time for poll to close
 * @param {string[]} voter_identifiers - list of identifiers to hash for the user
 * @param {int[]} poll_operators - list of account IDs for poll operators
 *
 * @throws exception if the poll ID is not unique
 * @throws exception if poll initialization message could not be attached to the tangle
 */
exports.initializePoll = function(poll_id, destination_account, vote_definitions, start_time, end_time, voter_identifiers, poll_operators) {
  console.log('Beginning initializePoll function.')
}

/**
 * Query the ledger to ensure that there currently exists no poll in the tangle
 * with the passed in poll ID
 *
 * @throws exception if connection to query tangle could not be established
 *
 * @returns true if unique, false if not
 */
exports.ensureUniquePollId = function(poll_id) {
  console.log('Beginning ensureUniquePollId function.')
}

/**
 * Get a list of the VoteDefinition objects part of this poll. When the polling station
 * was started in the webapp, the poll initialization message was saved locally. This
 * will be queried to retrieve a list of all these objects. The TrueVote webapp will then
 * iterate through this list and show a separate screen for each vote, performing instant
 * valiation to ensure the number of votes is accurate and saving the vote locally until
 * all votes have a response (or no response if the min_num_responses is set to zero).
 * 
 * @returns the VoteDefinition objects for this poll
 */
exports.getVoteDefinitions = function() {
  console.log('Beginning getVoteDefinitions function.')
}


/**
 * This function will be called after the webapp has iterated through all vote definitions
 * as defined in function above and the voter has responded to all required votes. This
 * function will aggregate that vote data, encrypt it, and then attach it to the tangle. Note
 * that the data required to attach it to the tangle (e.g. destination account ID) is saved
 * locally from setting up the polling station, and can be retrieved by calling the function
 * below.
 *
 * @throws exception if message could not be attached to tangle
 */
exports.placeVote = function() {
  console.log('Beginning placeVote function.')
}


/**
 * Retrieve the ITOA destination account ID to which to send the message
 * containing the voting data
 *
 * @returns the account ID of IOTA account to which to send the voting data
 */
 
exports.getDestinationAccount = function() {
  console.log('Beginning getDestinationAccount function.')
}



