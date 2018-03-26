# TrueVote Engine

## Introduction

We are using the [IOTA tangle](https://iota.org/) to store all our vote data. We will do this by sending transactions of 0 value from known wallets to the tangle and encoding the vote information in the message attached to those transfers. Below we define the basic requirements and functions required for such a system.

## Poll Initialization

For every poll created, there will be a single 'poll initialization' message published to the tangle. This message will contain all required details for the poll, such as the poll name and ID, the questions and response options, the limitations for possible responses, the start and end date of the poll, and a list of poll operators (discussed below).

* ##### poll initialization metadata

      {
            "poll_id": STRING,
            "destination_account": STRING,
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
- destination_account: the account ID of the wallet to which to send the transaction
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

The poll ID and destination account ID together will be used to count responses after voting has been completed. Only votes whose timestamp falls within the valid time range & whose source account ID stems from one of the poll operator wallets will be considered. The user idenfitiers will be all capitalized.

## Poll Operators

Instead of taking a completely decentralized approach to our voting system, we have decided to use a small set of trusted poll operators to oversee the voting process. This list of poll operators will be specified at the same the poll is instantiated and will be immutable throughout the voting process. The role of the poll operator is to perform identity verification of the voters (similar to how voting is currently done with polling places in governmental elections). This will allow us to filter out all 'fake' votes by counting only votes that originated from one of the listed account IDs, into which only the poll operators who have the seed can log in.

### Current Process

For our initial version, we have implemented the application such that voters physically show up at polling stations where there will be one or more polling operator(s). Each polling operator will run the TrueVote webapp on a computer. When a voter shows up, he/she will give the poll operator the required identification material (e.g. a license), and the poll operator will enter the voter data into the computer. The reason we have the poll operators perform this task instead of the voters is to avoid frauf, as we trust the poll operators but not necessarily the voters. (We could have the voters enter the information themselves again, too - this would be redudant, but if there is a mismatch then it would easily be caught, as the chance of the poll operator and the voter making the same mistake would be improbable). After this step is complete, the poll operator will then turn the computer over to the voter, who can anonymously complete all questions within that poll. After the voter is done, he/she will submit the vote and there will be a waiting screen to show the user that the vote has been successfully attached to the tangle. Once this has happened, the computer will be turned back to the poll operator to enter the information of the next voter. To ensure that the voter does not proceed to enter fake information for the next 'voter' and vote again, the webapp will require a password for each new vote to be submitted. This password will be set locally at the beginning of the TrueVote session.

### Future Extensions

In the future, we would like to support identify verification through an API to a database containing the required identity information. Once this happens, we can work on establishing the required security measures that would be required for users to vote remotely from their localhost rather than physically going to a polling station to cast a vote.

## Vote Format

* ##### vote placement data

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

Term explanations:
- poll_id: ID identifying the poll for which this vote will be cast
- timestamp: current timestamp attached to the vote by the webapp
- vote_responses: an encrypted map of vote responses
- unique_user_identifier: a hash of the user identifiers as specifie by the poll initialization message

Note that to encrypt the vote responses, a key will have been distributed to the poll operators initially, and they will enter this information into the webapp when they set up the polling station. The key to decrypt this information will only be available to the individual or group of individuals who will be counting up the votes. Also once the vote has been cast, the user idenfication information will not longer be available. This is to ensure anonymity in our system in case the security of the key system for encryption is compromised. The idea is that if we have enough identifiers, then there should be no hash collisions between voters.

## Application Specifications

### Classes

* ##### class VoteDefinition {

      /**
       * Create a VoteDefinition.
       *
       * @param {string} title - the title of the question (e.g. "Who should become president?")
       * @param {map<string:int>} responses - the response texts mapped to unique response IDs
       * @param {int} min_num_responses - the minimum number of responses allowed
       * @param {int} max_num_responses - the maximum number of responses allowed
       */
      constructor(title, responses, min_num_responses, max_num_responses) {}
       
      /**
       * Get the title
       */
      getTitle() {}
      
      /**
       * Get a map of response texts mapped to unique response IDs
       */
      getResponses() {}
       
      /**
       * Get the minimum number of responses allowed
       */
      getMinNuResponses() {}
       
      /**
       * Get the maximum number of responses allowed
       */
      getMaxNumResponses() {}
}

### Poll Initialization

* ##### function initializePollFromTemplate(path):
      /**
       * Will initialize poll based on the data entered into a template JSON file
       * of the poll initialization metadata described in the section above. This
       * function parses the template and calls the initializePoll() function below.
       *
       * @params {string} path - the relative path to the filled in template
       */

* ##### function initializePoll(poll_id, destination_account, vote_definitions, start_time, end_time, voter_identifiers, poll_operators):
      /**
       * Will initialize a poll by ensuring poll metadata is valid (by calling the      
       * ensureUniquePollID() function below) and attaching the message to the tangle.
       *
       * @params {string} poll_id - a unique identifier for the poll
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

* ##### function ensureUniquePollId(poll_id):
      /**
       * Query the ledger to ensure that there currently exists no poll in the tangle
       * with the passed in poll ID
       *
       * @throws exception if connection to query tangle could not be established
       *
       * @returns true if unique, false if not
       */
       
### Vote Placement

* ##### function getVoteDefinitions():
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
       
* ##### function placeVote():
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
       
* ##### function getDestinationAccount
      /**
       * Retrieve the ITOA destination account ID to which to send the message
       * containing the voting data
       *
       * @returns the account ID of IOTA account to which to send the voting data
       */
       
## Challenges

- ensure vote has been accepted on tangle --> currently planning buffer on webapp until accepted & add functionality for a user to check his/her vote
- mechanism to deal with messages not accepted to be attached to the tangle --> currently assuming all messages will be attached


