'''
	test voteDefinition.py
'''

from voteDefinition import VoteDefinition

#test single select vote
voteDef1 = VoteDefinition(subject='graduation year', options=['2018', '2019', '2020'])
assert voteDef1.isValidVote(['2018'])
assert not voteDef1.isValidVote(['2013'])
assert not voteDef1.isValidVote(['2018', '2019'])

#test multi select vote
voteDef2 = VoteDefinition(subject='graduation year', options=['2018', '2019', '2020'], maxOptions=3)
assert voteDef2.isValidVote(['2018'])
assert voteDef2.isValidVote(['2018', '2019'])
assert voteDef2.isValidVote(['2018', '2019', '2020'])
assert not voteDef2.isValidVote(['2018', '2019', '2020', '2020'])

#test exact select vote
voteDef3 = VoteDefinition(subject='graduation year', options=['2018', '2019', '2020'], minOptions=2, maxOptions=2)
assert not voteDef3.isValidVote(['2018'])
assert voteDef3.isValidVote(['2018', '2019'])
assert not voteDef3.isValidVote(['2013', '2018'])
assert not voteDef3.isValidVote(['2018', '2019', '2020'])


'''
	test poll.py
'''

from poll import Poll

#create poll with one vote definition of each type
testPoll = Poll(pollId='0001', pollName='test poll')
testPoll.createSingleSelectVote(subject='graduation year', options=['2018', '2019', '2020'])
testPoll.createMultiSelectVote(subject='classes taken', options=['CS2110', 'CS2200', 'CS3251'])
testPoll.createExactSelectVote(subject='best two colors out of this list', options=['green', 'blue', 'yellow'], numSelect=2)

#test properties correctly set
votes = testPoll.votes
assert len(votes) == 3
assert votes[0].subject == 'graduation year'
assert votes[1].options == ['CS2110', 'CS2200', 'CS3251']
assert votes[2].validNumOptions == (2,2)

