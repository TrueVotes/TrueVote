'''
	a vote definition defines the subject and options for a poll
'''

import json

class VoteDefinition:

	def __init__(self, subject, options, minOptions=1, maxOptions=1):
		'''
		@summary: create a new vote definition

		@param subject (String): vote's subject/title
		@param options (Set): set of possible options
		@param minOptions (int): the minimum number of option to select
		@param maxOptions (int): the maximum number of options to select 
		'''
		self.subject = subject
		self.options = options
		self.validNumOptions = (minOptions, maxOptions)

	def exportVoteDefinition(self):
		'''
		@summary: return JSON object representation for the vote definition
		'''
		return json.dumps({
			'subject': self.subject,
			'options': self.options,
			'minOptions': self.validNumOptions[0],
			'maxOptions': self.validNumOptions[1]
		})

	def isValidVote(self, castedOptions):
		'''
		@summary: ensure that a casted vote for this vote definition is valid

		@param castedOptions (set): ensure the casted options are valid options and that a valid
			                        number of options was selected

		@returns boolean as to whether vote is valid
		'''
		if not (len(castedOptions) >= self.validNumOptions[0] and len(castedOptions) <= self.validNumOptions[1]):
			return False
		if not set(castedOptions) <= set(self.options):
			return False
		return True



