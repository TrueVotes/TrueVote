# TrueVote

## Introduction

The goal of this project is to create a robust system of voting, built onto the tangle, that allows subversive, rebellious groups to vote in the face of an oppressive government. It originated in an Internet Systems class at Georgia Tech (CS 4675) and wanted to make the project public such that other IOTA developers can join the process of building a robust voting system.

Our main use case and basis for modelling this codebase was the Catalan Referendum, where the region of Catalan was trying to accrue votes to secede from the Spanish union while the Spanish government was actively suppressing such a vote.

We are using the [IOTA tangle](https://iota.org/) to store all our vote data. We will do this by sending transactions of 0 value to specific addresses on the tangle and encoding the vote information in the message attached to those transfers. Below we explain our project requirements and design considerations for the codebase.

## Poll Initialization

For every poll created, there will be a single 'poll initialization' message published to the tangle. This message will contain all metadata about the poll: a unique poll ID, the questions and response options, the start and end date of the poll, and a list of voter identifiers that will be recorded & hashed.

## Poll Operators

Instead of taking a completely decentralized approach to our voting system, we have decided to use a small set of trusted poll operators to oversee the voting process. This is due to the fact that for the identity verification of voters is one of the main cruxes of this application. We decided to use poll operators as a middlelayer between the voters and the poll for three reasons:
  1. security: identity verification over the network is a very challenging task, where we believe that the risk of cyber attacks to spoof a fake identity would be significantly easier than it would be to fake an identity when voting at a physical polling station.
  2. 

Note: ideally, we would like implement a safe method for voters to vote directly from home from their own laptops. Current methods for this make use of IP address and centralized database to store account information, but there is high potential for cyber crime with IP addresses, and having a database of authenticated users would go against the decentralized design we have tried to create. We were exploring some spaces where the webapp can use facial recognition similar techniques to identify the voter as well as an identification card such as their license or something (depending on the identifiers the poll creation message requires). We believe that this last point could be explored further to come up with a method to verify the identity of voters without a physical polling operator, but given the time constraint we had for the project, this was deprioritized over building a function voting application. Hopefully this can be improved in future versions.

### Current Process

For our initial version, we have implemented the application such that voters physically show up at polling stations where there will be one or more polling operator(s). Each polling operator will run the TrueVote webapp on a computer. When a voter shows up, he/she will give the poll operator the required identification material (e.g. a license), and the poll operator will enter the voter data into the computer. The reason we have the poll operators perform this task instead of the voters is to avoid frauf, as we trust the poll operators but not necessarily the voters. (We could have the voters enter the information themselves again, too - this would be redudant, but if there is a mismatch then it would easily be caught, as the chance of the poll operator and the voter making the same mistake would be improbable). After this step is complete, the poll operator will then turn the computer over to the voter, who can anonymously complete all questions within that poll. After the voter is done, he/she will submit the vote and there will be a waiting screen to show the user that the vote has been successfully attached to the tangle. Once this has happened, the computer will be turned back to the poll operator to enter the information of the next voter. To ensure that the voter does not proceed to enter fake information for the next 'voter' and vote again, the webapp will require a password for each new vote to be submitted. This password will be set locally at the beginning of the TrueVote session.

### Future Extensions

In the future, we would like to support identify verification through an API to a database containing the required identity information. Once this happens, we can work on establishing the required security measures that would be required for users to vote remotely from their localhost rather than physically going to a polling station to cast a vote.

## Challenges

- ensure vote has been accepted on tangle --> currently planning buffer on webapp until accepted & add functionality for a user to check his/her vote
- mechanism to deal with messages not accepted to be attached to the tangle --> currently assuming all messages will be attached

## Caveats
At the end of the voting period, poll administrator private seeds are publicized (so any vote published after this point are invalid) and now anyone can verify the full list of transactions/votes entered by each voting station.

We are using a light node, using the public servers at http://iotasupport.com/lightwallet.shtml
We suggest setting up a full node for reliability if this is to be used by any large organization, but we cannot set one up as we do not plan on maintaining it 24/7
