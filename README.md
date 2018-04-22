# TrueVote

A robust, tamper-free voting system built on top of the [IOTA tangle](https://iota.org/) that grants voters anonymity but also affords anyone the ability to verify the history of votes placed in the system. In this completely decentralized design, all data associated with voting processes will be stored on the IOTA tangle to reduce security vulnerabilities and to allow for risk-free scaling of the system. See below for a more detailed project description.

### Getting Started

The backend code for TrueVote can be found in the truevote-engine directory. For the frontend, there are two different implementations affording the same functionality, react-webapp and vue-webapp. The react version of the frontend is still under construction, and contributions to completing the implementations are encouraged. Frontend-specific installation, additional prerequisite, and running instructions can be found within the respective subdirectories.

### Prerequisites

TODO: what things to install the software and how to install them

```
Give examples
```


### Built With

* [IOTA API v1.2.0](https://iota.readme.io/v1.2.0/reference) - the API for IOTA


### Contributing

This is an open-source project and contributions for improvements as well as new features are encouraged.


### Known Bugs & Limitations

* We are currently using a light node that relies on an external full node to complete our IOTA transfers and queries for us. We are using http://iotasupport.com/lightwallet.shtml to find full nodes, but as these can restrict API permissions, we suggest setting up a full node for reliability if this is to be used by a large organization.
* The IOTA API supports a function to query the tangle by tags, but as of April 2018, this functionality did not work and simply returned an empty list. We catered our design around this bug such that we do not require this functionality.
* TODO: add the bug about the API returning the same address each time

### Future Extensions

1. **Identity verification**: We would like to support identitiy verification without a polling operator such that voters can place votes remotely from their localhosts, rather than having to physically go to a polling station to cast a vote. We believe that implementing this securely will be the crux of the voting system, as there are major limitations to all current methods of performing this task.

2. **Retroactive vote checking**: We would like to add functionality for a user to retroactively (after the poll has closed) check the vote that he/she had placed in that poll. This would be done by the user inputting the required identification parameters, hashing that, then finding the corresponding hash on the tangle and either displaying that this does not exist, that there were multiple votes (which would most likely suggest fraud), or the appropriate voting data if there was a single entry with the hash.

3. **React webapp**: We would like to finish the implementation of the React webapp. As none of us were very familiar with React, we encountered a few issues with locally and globally storing data that would be need to accessed in the code later. We would appreciate any React developers to take a look at our codebase and flush out the implementation to make it functional.


### Authors

* **Carina Claassen** - *System Design* - [cclaassen3](https://github.com/cclaassen3/) - GT Graduate, Software Engineer at Google
* **Sam Crane** - *Webapp Design & Implementation* - [samcrane8](https://github.com/samcrane8) - GT Student
* **Eric Martin** - *Backend Implementation* - [EricMartin827](https://github.com/EricMartin827) - GT Graduate
* **Kyle Murray** - *Backend Implementation* - [kmurray30](https://github.com/kmurray30) - GT Graduate, Software Engineer at Microsoft


--------------------------------------------------


## Detailed Project Description

### Project Inspiration

The project idea originated in an Internet Systems class at Georgia Tech (CS4675 taught by Ling Liu). The inspiration for this project the Catalan Referendum, where the Spanish region of Catalan was attempting to accrue votes from their people about whether to secede from the Spanish government. The Spanish governement, however, was actively suppressing any accumulations of votes; thus we realized the need for a robust and tamper-free system, leading us to design TrueVote.

### High-Level Architecture Description

The TrueVote system stores all data on the IOTA tangle within the messages of 0-value transfer transactions. Below we explain the project requirements and design considerations for the codebase.

---------------------------------------

TODO: revamp everything past this point....

### Poll Initialization

For every poll created, there will be a single 'poll initialization' message published to the tangle. This message will contain all metadata about the poll: a unique poll ID, the questions and response options, the start and end date of the poll, and a list of voter identifiers that will be recorded & hashed.

### Poll Operators

Instead of taking a completely decentralized approach to our voting system, we have decided to use a small set of trusted poll operators to oversee the voting process. This is due to the fact that for the identity verification of voters is one of the main cruxes of this application. We decided to use poll operators as a middlelayer between the voters and the poll for three reasons:
  1. security: identity verification over the network is a very challenging task, where we believe that the risk of cyber attacks to spoof a fake identity would be significantly easier than it would be to fake an identity when voting at a physical polling station.
  2. 

Note: ideally, we would like implement a safe method for voters to vote directly from home from their own laptops. Current methods for this make use of IP address and centralized database to store account information, but there is high potential for cyber crime with IP addresses, and having a database of authenticated users would go against the decentralized design we have tried to create. We were exploring some spaces where the webapp can use facial recognition similar techniques to identify the voter as well as an identification card such as their license or something (depending on the identifiers the poll creation message requires). We believe that this last point could be explored further to come up with a method to verify the identity of voters without a physical polling operator, but given the time constraint we had for the project, this was deprioritized over building a function voting application. Hopefully this can be improved in future versions.

### Current Process

For our initial version, we have implemented the application such that voters physically show up at polling stations where there will be one or more polling operator(s). Each polling operator will run the TrueVote webapp on a computer. When a voter shows up, he/she will give the poll operator the required identification material (e.g. a license), and the poll operator will enter the voter data into the computer. The reason we have the poll operators perform this task instead of the voters is to avoid frauf, as we trust the poll operators but not necessarily the voters. (We could have the voters enter the information themselves again, too - this would be redudant, but if there is a mismatch then it would easily be caught, as the chance of the poll operator and the voter making the same mistake would be improbable). After this step is complete, the poll operator will then turn the computer over to the voter, who can anonymously complete all questions within that poll. After the voter is done, he/she will submit the vote and there will be a waiting screen to show the user that the vote has been successfully attached to the tangle. Once this has happened, the computer will be turned back to the poll operator to enter the information of the next voter. To ensure that the voter does not proceed to enter fake information for the next 'voter' and vote again, the webapp will require a password for each new vote to be submitted. This password will be set locally at the beginning of the TrueVote session.


### Challenges

- ensure vote has been accepted on tangle --> currently planning buffer on webapp until accepted & add functionality for a user to check his/her vote
- mechanism to deal with messages not accepted to be attached to the tangle --> currently assuming all messages will be attached

### Caveats
At the end of the voting period, poll administrator private seeds are publicized (so any vote published after this point are invalid) and now anyone can verify the full list of transactions/votes entered by each voting station.

We are using a light node, using the public servers at http://iotasupport.com/lightwallet.shtml
We suggest setting up a full node for reliability if this is to be used by any large organization, but we cannot set one up as we do not plan on maintaining it 24/7
