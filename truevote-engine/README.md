# TrueVote Engine

## Introduction

We are using the [IOTA tangle](https://iota.org/) to store all our vote data. We will do this by sening transactions of 0 value to the tangle an encoding the vote information in the message attached to the transfer. Below we define the basic functions required for such a system.

### Poll Initialization

* ##### format: poll initialization metadata

      {
            "poll_id": STRING,
            "vote_definitions": [
                  {
                        "title": STRING,
                        "responses": {
                              response_string_0: response_id_0,
                              response_string_1: response_id_1,
                              ...
                              response_string_n: response_id_n
                        },
                        "min_num_responses": NUMBER (0 <= NUMBER <= n),
                        "max_num_responses": NUMBER (0 <= NUMBER <= n)
                  }
            ],
            "start_time": DATETIME,
            "end_time": DATETIME,
            "poll_operators": [
                  HASHED_KEY_0,
                  HASHED_KEY_1
            ]
      }

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
- encrypting vote data
- ensure vote has been accepted on tangle
