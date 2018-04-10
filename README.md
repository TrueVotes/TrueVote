# TrueVote

## Introduction

The goal of this project is to create a robust system of voting, built
onto the tangle, that allows subversive, rebellious groups to vote in
the face of an oppressive government.

Our main use case, and basis for modelling this codebase is the Catalan
Referendum, where the region of Catalan was trying to vote to secede
from the Spanish union. 

## Caveats
At the end of the voting period, poll administrator private seeds are publicized (so any vote published after this point are invalid) and now anyone can verify the full list of transactions/votes entered by each voting station.

We are using a light node, using the public servers at http://iotasupport.com/lightwallet.shtml
We suggest setting up a full node for reliability if this is to be used by any large organization, but we cannot set one up as we do not plan on maintaining it 24/7
