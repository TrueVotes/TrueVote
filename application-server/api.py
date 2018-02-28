from flask_api import FlaskAPI
import flask, json


#instantiate API
api = FlaskAPI(__name__)


@api.route("/initializePoll", methods=['POST'])
def initializePoll():
	'''
	@summary:
		(i) ensure this is a unique poll ID
		(ii) add poll initialization message to the ledger with the poll metadata

	@returns:
		202 - OK poll ID is unique and poll initialization message successfully
			  added to the leger with the poll metadata
		406 - ERROR poll ID was is unique
		500 - ERROR poll initialization message was not added to the ledger or
			  ledger could not successfully be queried properly
	'''
	return flask.make_response(flask.jsonify(
		{'error': 'could not query ledger to ensure unique poll ID'}), 500)


@api.route("/ensureUniquePollId", methods=['GET'])
def ensureUniquePollId():
	'''
	@summary: check the ledger to ensure that there currently exists no poll on the
		      the ledger with the passed in poll ID

	@returns: 
		200 - OK poll ID is unique
		406 - ERROR poll ID is not unique
		500 - ERROR ledger could not be queried properly
	'''
	return flask.make_response(flask.jsonify(
		{'error': 'could not query ledger to ensure unique poll ID'}), 500)


@api.route("/getVoteOptions", methods=['GET'])
def getVoteOptions():
	'''
	@summary: get a list of possible vote options for a passed in poll ID

	@returns:
		200 - OK a list of the vote options for the specified poll
		400 - ERROR poll ID does not exist
		500 - ERROR ledger could not be queried

	'''
	return flask.make_response(flask.jsonify(
		{'error': 'could not query ledger to retrieve vote options'}), 500)


@api.route("/placeVote", methods=['POST'])
def placeVote():
	'''
	@summary: adds a vote to the ledger

	@returns:
		200 - OK vote was added to the ledger
		400 - ERROR poll ID does not exist or vote option does not exist for the 
			  specified poll or the number of votes is not appropriate for the poll
		500 - ERROR could not query or add to the ledger
	'''
	return flask.make_response(flask.jsonify(
		{'error': 'connection with ledger could not be established'}), 500)


#execute file to run API on localhost:5000
if __name__ == "__main__":
    api.run()