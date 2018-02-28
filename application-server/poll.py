'''
	a poll comprises a collection of vote definitions
'''

from voteDefinition import VoteDefinition
import json

class Poll:

	def __init__(self, pollId, pollName):
		'''
		@summary: create a new poll

		@param pollId (String): unique poll ID
		@param polLName (String): name of the poll
		'''
		self.pollId = pollId
		self.pollName = pollName
		self.votes = []

	def exportPoll(self):
		'''
		@summary: return JSON object representation for the poll
		'''
		return json.dumps({
			'pollName': self.pollName,
			'pollId': self.pollId,
			'votes': [json.loads(vote.exportVoteDefinition()) for vote in self.votes]
		})

	def createSingleSelectVote(self, subject, options):
		'''
		@summary: creates a new VoteDefinition where a single option should be selected

		@param subject (String): vote's subject/title
		@param options (Set): set of possible options
		'''
		self.votes.append(VoteDefinition(subject=subject, options=options, minOptions=1, maxOptions=1))

	def createMultiSelectVote(self, subject, options):
		'''
		@summary: creates a new VoteDefinition where any number of options can be selected

		@param subject (String): vote's subject/title
		@param options (Set): set of possible options
		'''
		self.votes.append(VoteDefinition(subject=subject, options=options, minOptions=1, maxOptions=len(options)))

	def createExactSelectVote(self, subject, options, numSelect):
		'''
		@summary: creates a new VoteDefinition where exactly numSelect options must be selected

		@param subject (String): vote's subject/title
		@param options (Set): set of possible options
		@param numSelect (int): the number of options that should be selected
		'''
		self.votes.append(VoteDefinition(subject=subject, options=options, minOptions=numSelect, maxOptions=numSelect))


