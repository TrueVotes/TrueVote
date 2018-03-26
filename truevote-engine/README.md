# TrueVote Engine

## Introduction

We are using the [IOTA tangle](https://iota.org/) to store all our vote data. We will do this by sending transactions of 0 value from known wallets to the tangle and encoding the vote information in the message attached to those transfers. Below we define the basic requirements and functions required for such a system.

## Poll Initialization

For every poll created, there will be a single 'poll initialization' message published to the tangle. This message will contain all required details for the poll, such as the poll name and ID, the questions and response options, the limitations for possible responses, the start and end date of the poll, and a list of poll operators (discussed below).

* ##### format: poll initialization metadata

      {
            "poll_id": STRING,
            "destination_address": STRING,
            "vote_definitions": [
                  {
                        "title": STRING,
                        "responses": {
                              response_string_0: 0,
                              response_string_1: 1,
                              ...
                              response_string_n: n
                        },
                        "min_num_responses": NUMBER (0 <= NUMBER <= n),
                        "max_num_responses": NUMBER (0 <= NUMBER <= n)
                  }
            ],
            "start_time": DATETIME,
            "end_time": DATETIME,
            "voter_identifiers": [STRING],
            "poll_operators": [
                  WALLET_0,
                  WALLET_1
            ]
      }
      
To further elaborate on these terms:
- poll_id: a unique string (to all previous polls) that will identify the poll
- destination_address: the address of the wallet to which to send the transaction
- vote_definitions: a list of questions and possible responses
      - title: the name/question
      - responses: a list of possible responses mapped to IDs to identify the responses
      - min_num_responses: the minimum number of responses allowed for the question
      - max_num_responses: the maximum number of responses allowed for the question
            (e.g. 1 if limited to 1 response)
- start_time: datetime object of the time when the poll will start
- end_time: datetime object of the time when the poll will close
- voter_identifiers: a list of identifiers (e.g. first name, SSN) to identify the voter
- poll_operators: the account IDs of the poll operators

The poll ID and destination address together will be used to count responses after voting has been completed. Only votes whose timestamp falls within the valid time range & whose source address stems from one of the poll operator wallets will be considered. The user idenfitiers will be all capitalized.

## Poll Operators

Instead of taking a completely decentralized approach to our voting system, we have decided to use a small set of trusted poll operators to oversee the voting process. This list of poll operators will be specified at the same the poll is instantiated and will be immutable throughout the voting process. The role of the poll operator is to perform identity verification of the voters (similar to how voting is currently done with polling places in governmental elections). This will allow us to filter out all 'fake' votes by counting only votes that originated from one of the listed account IDs, into which only the poll operators who have the seed can log in.

### Current Process

For our initial version, we have implemented the application such that voters physically show up at polling stations where there will be one or more polling operator(s). Each polling operator will run the TrueVote webapp on a computer. When a voter shows up, he/she will give the poll operator the required identification material (e.g. a license), and the poll operator will enter the voter data into the computer. The reason we have the poll operators perform this task instead of the voters is to avoid frauf, as we trust the poll operators but not necessarily the voters. (We could have the voters enter the information themselves again, too - this would be redudant, but if there is a mismatch then it would easily be caught, as the chance of the poll operator and the voter making the same mistake would be improbable). After this step is complete, the poll operator will then turn the computer over to the voter, who can anonymously complete all questions within that poll. After the voter is done, he/she will submit the vote and there will be a waiting screen to show the user that the vote has been successfully attached to the tangle. Once this has happened, the computer will be turned back to the poll operator to enter the information of the next voter. To ensure that the voter does not proceed to enter fake information for the next 'voter' and vote again, the webapp will require a password for each new vote to be submitted. This password will be set locally at the beginning of the TrueVote session.

### Future Extensions

In the future, we would like to support identify verification through an API to a database containing the required identity information. Once this happens, we can work on establishing the required security measures that would be required for users to vote remotely from their localhost rather than physically going to a polling station to cast a vote.

## Vote Format

* ##### format: vote placement data

      {     
            "poll_id": STRING,
            "timestamp": DATETIME,
            "vote_responses": ENCRYPTED({
                  title_0: [response_ids],
                  title_1: [response_ids],
                  ...
                  title_n: [response_ids]
            }),
            "unique_user_identifier": HASH
      }
      
Explanation:
- poll_id: ID identifying the poll for which this vote will be cast
- timestamp: current timestamp attached to the vote by the webapp
- vote_responses: an encrypted map of vote responses
- unique_user_identifier: a hash of the user identifiers as specifie by the poll initialization message

Note that to encrypt the vote responses, a key will have been distributed to the poll operators initially, and they will enter this information into the webapp when they set up the polling station. The key to decrypt this information will only be available to the individual or group of individuals who will be counting up the votes. Also once the vote has been cast, the user idenfication information will not longer be available. This is to ensure anonymity in our system in case the security of the key system for encryption is compromised. The idea is that if we have enough identifiers, then there should be no hash collisions between voters.

## Application Specifications

### Poll Initialization

* ##### function: initializePoll(poll_metadata):
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

* ##### function: ensureUniquePollId(poll_id):
      '''
      @summary: check the ledger to ensure that there currently exists no poll on the
              the ledger with the passed in poll ID
      @returns: 
        200 - OK poll ID is unique
        406 - ERROR poll ID is not unique
        500 - ERROR ledger could not be queried properly
      '''

### Vote Placement

* ##### format: vote placement data

      {
            "poll_id": STRING,
            "vote_responses": {
                  title: {
                        response_string_0: response_id_0,
                        response_string_1: response_id_1,
                        ...
                        response_string_n: response_id_n
                  }
            },
            "timestamp": DATETIME,
            "poll_operator": HASHED_KEY,
            "unique_user_identifier": encrypted_json_object
      }
      
* _note: the unique user identifier will be a JSON object that will be encrypted with a private key that will be generated during the development of this project and be shared only with select trusted sources (e.g. poll operators, government official) such that only they can decrypt this data and verify uniqueness and validity for users_

* ##### function: getVoteOptions(poll_id):
      '''
      @summary: get a list of possible vote options for a passed in poll ID
      @returns:
        200 - OK a list of the vote options for the specified poll
        400 - ERROR poll ID does not exist
        500 - ERROR ledger could not be queried
      '''

* ##### function: placeVote(poll_id):
      '''
      @summary: adds a vote to the ledger and verifies that it is a valid vote
      @returns:
        200 - OK vote was added to the ledger
        400 - ERROR poll ID does not exist or vote option does not exist for the 
            specified poll or the number of votes is not appropriate for the poll
        500 - ERROR could not query or add to the ledger
      '''

## Challenges

- ensuring that random user cannot simply add an entry to the ledger that will emulate our data format & be counted as a vote
- verifying keys of poll operators when placing votes
- encrypting vote data --> encrypted with private key distributed to select group of trusted people (e.g. poll operators)
- ensure vote has been accepted on tangle --> buffer on webapp until accepted & add functionality for a user to check his/her vote


