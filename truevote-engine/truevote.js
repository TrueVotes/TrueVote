const IOTA = require('iota.lib.js');
const fs = require('fs');
const crypto = require('crypto');


//const FULL_NODE_ADDR_ATL = "https://peanut.iotasalad.org:14265";
//const TEST_NODE = "http://148.251.101.174:14265";
/* Access a main network node and use a random seed generated from terminal
 * to get things going. ;)
 */
const FULL_NODE_ADDR = "https://field.carriota.com:443";
const SEED = "OLXCLVSZONEYGZHWRQYGWYLCECRNVREEJVCPEWVOYCKYGFLXPERVWRDM9W9GYWMJUJRWCVSXLRLFSNTRX";
const iota = new IOTA({
    provider: FULL_NODE_ADDR
});

/**
 * This is just a test to make sure we're connecting to the node. Also
 * let's us get information on said iota node.
 */
exports.node_info_test = function() {

    iota.api.getNodeInfo((err, success) => {
	if (err) {
	    console.error(err);
	} else {
	    console.log(success);
	}
    });
}

/**
 * Helper function for parsing out useful client side data from a full node
 * response. Iota payloads are contained in the 'signatureMessageFragment' of
 * a full node's response. Oddly, the iota utility fromTrytes requires a tryteString
 * to e of even length. If it's odd, the utility return null. Consequently, the
 * tryte string must be stripped of its last tryte if the string is of odd length.
 * The string/payload will be submitted in JSON form, therefore go ahead an convert
 * it back to JSON for the client webapp.
 * 
 * @param {string} iota_payload - payload in signatureMessageFragment of an iota
 *                                response
 * @retrun {object} the json object saved to the iota tangle
 */
function parseTrytePayload(iota_payload) {
    
    if (iota_payload.length % 2 !== 0) {
        iota_payload = iota_payload.substring(0, iota_payload.length - 1);
    }
    var obj = iota.utils.fromTrytes(iota_payload);
    obj = obj.substring(0, obj.indexOf("\u0000"));
    return JSON.parse(obj);
}

function parseTryteTag(iota_tag) {

    if (iota_tag.length % 2 !== 0) {
        iota_tag = iota_tag.substring(0, iota_tag.length - 1);
    }
    return iota.utils.fromTrytes(iota_tag);
}

/**
 * Helper function for converting an iota response to a client friendly message which
 * enables data to be reaccessed (address, hash, tag) from the tangle.
 *
 * @param {array} iota_reponse - raw data response from the iota tangle after submitting
 *                               a transaction
 * @retrun {object} msg - client friendly objest containing useful meta data
 */

function parseTransaction(iota_response) {

    var msg = {
        hash : iota_response[0].hash,
        address : iota_response[0].address,
        bundle : iota_response[0].bundle,
        tryte_tag : iota_response[0].tag,
        tag : parseTryteTag(iota_response[0].tag),
        payload : parseTrytePayload(iota_response[0].signatureMessageFragment)
    };
    return msg;
}

/**
 * Will attach a new transfer to the tangle.
 *
 * @param {string} destination_account - destination account ID
 * @param {string} message - message to attach to transfer with the data
 */
exports.attachToTangle = function(destination_account, message) {

    /* Not entirely sure if this function is necessary because getTransfer()
     * automatically attaches to the tangle when initializing poll or
     * placing votes.
     */
    console.log('Beginning attachToTangle function.');
}

/**
 * Will query the tangle based on the provided address assoicated with a
 * place vote transaction.
 *
 * @param {string} addr - the address of the transaction/individual vote
 * TODO: figure out parameters!!!
 */
exports.queryTangle = function(addr) {

    if (!addr) {
        return Promise.reject(new Error("Cannot query on null address"));
    }

    return new Promise((resolve, reject) => {
        iota.api.findTransactionObjects(
            {
                addresses : [addr]
            },
            (error, result) => {
                if (error) {
                    console.error(`Failed to query tangle with address: ${addr}\n`,
                                  error);
                    reject(error);
                } else {
                    resolve(parseTransaction(result));
                }
            }
        );
    });
}

/**
 * Will initialize poll based on the data entered into a template JSON file
 * of the poll initialization metadata described in the section above. This
 * function parses the template and calls the initializePoll() function below.
 *
 * @params {string} path - the relative path to the filled in template
 */
exports.initializePollFromTemplate = function(path) {

    const template = JSON.parse(fs.readFileSync(path));
    return new Promise((resolve, reject) => {

        ensureUniquePollId(template.poll_id)
            .then((result) => {

                if (!result) {
                    console.log(`Poll_ID ${poll_id} already exists on the tangle`);
                    resolve(null);
                }

                iota.api.getNewAddress(SEED, (error, addr) => {

                    if (error) {
                        console.error("Failed to genrate new address for poll initialization");
                        reject(error);

                    } else {
                        const tryteTag = iota.utils.toTrytes(template.poll_id);
                        delete template.poll_id;
                        const tryteData = iota.utils.toTrytes(JSON.stringify(template));
                        const transfer = [
                            {
                                value : 0,
                                address :  addr,
                                tag : tryteTag,
                                message : tryteData
                            }
                        ];

                        iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {
                            if (error) {
                                console.error("Failed to send vote template to tangle")
                                reject(error);
                            } else {
                                console.log("Poll Successfully Initialized: ", result);
                                resolve(parseTransaction(result));
                            }
                        });
                    }
                });

            }).catch((error) => reject(error)); /* Reject error form unique poll call */
    });
}

/**
 * Will initialize a poll by ensuring poll metadata is valid (by calling the      
 * ensureUniquePollID() function below) and attaching the message to the tangle.
 *
 * @param {string} poll_id - a unique identifier for the poll
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
exports.initializePoll = function(poll_id, destination_account, vote_definitions,
                                  start_time, end_time, voter_identifiers, poll_operators) {

    const poll_data = {
        "destination_account" : destination_account,
        "vote_definition" : vote_definition,
        "start_time" : start_time,
        "end_time" : end_time,
        "voter_identifiers" : voter_identifiers,
        "poll_operators" : poll_operators
    };

    return new Promise((resolve, reject) => {
        ensureUniquePollId(poll_id)
            .then((result) => {

                if (!result) {
                    console.log(`Poll_ID ${poll_id} already exists on the tangle`);
                    resolve(null);
                }

                const tryteTag = iota.utils.toTrytes(template.poll_id);
                const tryteData = iota.utils.toTrytes(JSON.stringify(poll_data));
                const transfer = [
                    {
                        value : 0,
                        address :  addr,
                        tag : tryteTag,
                        message : tryteData
                    }
                ];

                iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {
                    if (error) {
                        console.error("Failed to send vote template to tangle");
                        reject(error);
                    } else {
                        console.log("Poll Successfully Initialized: ", result);
                        resolve(parseTransaction(result));
                    }
                });
            }).catch((error) => reject(error));        
    });
}

/**
 * Query the ledger to ensure that there currently exists no poll in the tangle
 * with the passed in poll ID. All  polls save their poll_id as a transaction tag.
 * At the moment, the iota tag seems to be the only user defined field that
 * can be queried. If some other transaction on the iota network contains the same
 * then we should assume the poll is run by Facist Nazis and not trust it.
 *
 * @throws exception if connection to query tangle could not be established
 *
 * @returns true if unique, false if not
 */
function ensureUniquePollId(poll_id) {

    if (!poll_id) {
        return Promise.reject(new Error("Cannot query tangle for null poll_id"));
    }

    return new Promise((resolve, reject) => {
        iota.api.findTransactionObjects(
            {
                tags : [iota.utils.toTrytes(poll_id)]
            },
            (err, result) => {
                if (err) {
                    console.error(`Failed to query tangle with poll_id: ${poll_id}\n`,
                                  err);
                    reject(err);
                } else if (result.length === 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });
}
exports.ensureUniquePollId = ensureUniquePollId;

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
exports.getVoteDefinitions = function(poll_id) {

    if (!poll_id) {
        return Promise.reject(new Error("Cannot get voter definitions with null poll_id"));
    }

    return new Promise((resolve, reject) => {
        iota.api.findTransactionObjects(
            {
                tags : [poll_id]
            },
            (err, result) => {
                if (err) {
                    console.error("Failed to obtain voter definitions from poll_id: ", poll_id);
                    reject(err);
                } else {

                    console.log("Vote Definitions: ", result);
                    if (result.length === 0) {
                        reject(new Error("No values returned in get voter definitions"));
                        return;
                    }                    

                    const response = parseTransaction(result);
                    resolve(response.payload.voter_definitions);
                }
            });
    });
}


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
exports.placeVote = function(seed, poll_id, voter_id, voter_responses) {

    iota.api.getNewAddress(SEED, (err, addr) => {

        if (err) {
            console.error("Failed to obtain new address for vote placement:\n", err);

        } else {

            var data = {
                poll : poll_id,
                id : crypto.createHash("sha256").update(voter_id).digest("hex"),
                responses : voter_responses
            };

            const tryteData = iota.utils.toTrytes(JSON.stringify(data));
            const transfer = [
                {
                    value : 0,
                    address :  addr, // this might need to be 
                    message : tryteData
                }
            ];

            iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {
                if (error) {
                    console.log("Failed to send the voter data to the tangle:\n", error);
                } else {
                    console.log("Vote Successfully Placed:\n", result);
                }
            });
        }
    });
}


/**
 * Retrieve the ITOA destination account ID to which to send the message
 * containing the voting data. Since iota usese a 
 *
 * @returns the account ID of IOTA account to which to send the voting data
 */
 
exports.getDestinationAccount = function(poll_id) {

    if (!poll_id) {
        return Promise.reject(new Error("Cannot get voter definitions with null poll_id"));
    }

    return new Promise((resolve, reject) => {
        iota.api.findTransactionObjects(
            {
                tags : [poll_id]
            },
            (err, result) => {
                if (err) {
                    console.error("Failed to obtain voter definitions from poll_id: ", poll_id);
                    reject(err);
                } else {

                    console.log("Destination Account: ", result);

                    if (result.length === 0) {
                        reject(new Error("No values returned in get voter definitions"));
                        return;
                    }

                    const response = parseTransaction(result);
                    resolve(response.payload.voter_definitions);
                }
            });
    });
}
