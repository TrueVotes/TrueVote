const IOTA = require('iota.lib.js');
const fs = require('fs');
const crypto = require('crypto');
const cryptico = require('cryptico');


/* Access a main network node and use a random seed generated from terminal
 * to get things going. ;)
 */
const FULL_NODE_ADDR = "https://field.carriota.com:443";
// const SEED = "OLXCLVSZONEYGZHWRQYGWYLCECRNVREEJVCPEWVOYCKYGFLXPERVWRDM9W9GYWMJUJRWCVSXLRLFSNTRX";
// const SEED = "PTDOUAJJKHR9PUKHJVUNBWXEHPRA9YSLBQEFRJSAFPUM9ILJPJVSDGMKQZLAFZUAVIKZHKGEMCFUEEORE";
const SEED = "VZEWUEULPBTWML9BFKIKRZQLTNCTXDUW9KRPDOCXCOHCRZNGTMPDW9SMURQSSQZDJEBVVBPWSSXBIKSHP";

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
 * Helper function to encrypt any message using a public key and returns the 
 * encrypted message. Can take in any string and returns encrypted string.
 * 
 * @param {string} msg - msg to be encrypted
 * @param {string} pub_key - public key used for encryption
 * @return {object} the encrypted message
 */
function encrypt(msg, pub_key) {
    return cryptico.encrypt(msg, pub_key).cipher;
}

/**
 * Helper function to decrypt any encrypted message, encrypted with this library
 * 
 * @param {string} msg - msg to be decrypted
 * @param {string} priv_key - private key used for decryption
 * @return {object} the decrypted message
 */
function decrypt(msg, priv_key) {
    return cryptico.decrypt(msg, priv_key);
}

/**
 * Public function to decrypt any encrypted message, encrypted with this library
 * 
 * @param {string} msg - msg to be decrypted
 * @param {string} priv_key - private key used for decryption
 * @return {object} the decrypted message
 */
exports.decryptTransaction = function(data, priv_key) {
    return cryptico.decrypt(data, priv_key);
}

/**
 * Public function to encrypt any message in the form of a string
 * 
 * @param {string} msg - msg to be encrypted
 * @param {string} pub_key - public key used for encryption
 * @return {object} the encrypted message
 */
exports.encryptTransaction = function(data, priv_key) {
    return cryptico.encrypt(msg, pub_key).cipher;
}

/**
 * Helper function for parsing out useful client side data from a full node
 * response. Iota payloads are contained in the 'signatureMessageFragment' of
 * a full node's response. Oddly, the iota utility fromTrytes requires a tryteString
 * to of even length. If it's odd, the utility returns null. Consequently, the
 * tryte string must be stripped of its last tryte if the string is of odd length.
 * The string/payload will be submitted in JSON form, therefore we will go ahead an
 * convert it back to JSON for the client webapp.
 * 
 * @param {string} iota_payload - payload in signatureMessageFragment of an iota
 *                                response
 * @return {object} the json object representation saved on the iota tangle
 */
function parseTrytePayload(iota_payload) {
    
    if (iota_payload.length % 2 !== 0) {
        iota_payload = iota_payload.substring(0, iota_payload.length - 1);
    }
    var obj = iota.utils.fromTrytes(iota_payload);
    obj = obj.substring(0, obj.indexOf("\u0000"));
    return obj;
}

/**
 * Helper function for converting an iota response to a client friendly message,
 * for multiple responses
 *
 * @param {array} iota_reponse - raw data response from the iota tangle after submitting
 *                               a transaction
 * @return {object} contents - client friendly array of payload messages
 */

function parseTransactions(iota_response) {
    contents = [];
    for (var resp of iota_response) {
        payload = parseTrytePayload(resp.signatureMessageFragment);
        try {
            payload = JSON.parse(payload);
        } catch (err) {
        }
        contents.push(payload);
    }
    return contents;
}

/**
 * Takes in an array of iota transactions from recieved from findTransactionObjects(addr).
 * Parses through results and returns an array of decrypted json data of transaction
 * message contents.
 * 
 * @param {object} iota_response - repsonse from findTransactionObjects
 * @param {object} priv_key - key to decrypt data
 * @return {object} contents - array of json data of transaction contents
 */
function parseAndDecryptTransactions(iota_response, priv_key) {
    contents = [];
    for (var resp of iota_response) {
        payload = parseTrytePayload(resp.signatureMessageFragment);
        payload_decrypted = cryptico.decrypt(payload, priv_key).plaintext;
        if (payload_decrypted != undefined) {
            payload = payload_decrypted
        }
        payload = JSON.parse(payload);
        contents.push(payload);
    }
    return contents;
}

/**
 * Helper function for converting an iota response to a client friendly message which
 * enables data to be reaccessed (address, hash, tag) from the tangle.
 *
 * @param {array} iota_reponse - raw data response from the iota tangle after submitting
 *                               a transaction
 * @return {object} msg - client friendly objest containing useful meta data
 */

function parseTransaction(iota_response) {
    payload = parseTrytePayload(iota_response[0].signatureMessageFragment);
    try {
        payload = JSON.parse(payload);
    } catch (err) {
    }
    const msg = {
        hash : iota_response[0].hash,
        address : iota_response[0].address,
        bundle : iota_response[0].bundle,
        tag : iota_response[0].tag,
        payload : payload
    };
    return msg;
}

/**
 * Will query the tangle based on the provided address assoicated with a
 * place vote transaction.
 *
 * @param {string} addr - the address of the transaction/individual vote
 * @return {object} Promise - Promise object which returns a list of transactions 
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
                    resolve(parseTransactions(result));
                }
            }
        );
    });
}

/**
 * Will query the tangle based on the provided address assoicated with a
 * place vote transaction. It will also decrypt the results if provided the private key
 *
 * @param {string} addr - the address of the transaction/individual vote
 * @param {string} priv_key - the private key needed for decrytion
 * @return {object} Promise - Promise object which returns a list of transactions
 * all of which are decrypted if they were encrypted
 */
exports.queryAndDecryptTangle = function(addr, priv_key) {

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
                    resolve(parseAndDecryptTransactions(result, priv_key));
                }
            }
        );
    });
}


function generateIotaAddrs(ind) {

    return new Promise((resolve, reject) => {
        iota.api.getNewAddress(SEED, {index : ind}, (error, new_addrs) => {
            if (error) {
                console.error("Failed to generate a new address");
                reject(error);
            } else {
                resolve(new_addrs);
            }
        });
    });
}
exports.generateAddresses = generateIotaAddrs;

/**
* Will initialize poll based on the data entered into a template JSON file
* of the poll initialization metadata described in the section above. This
* function parses the template and calls the initializePoll() function below.
*
* @param {string} path - the relative path to the filled in template
* @param {int} iota_addr_ind - each unique poll MUST have a unique iota address generation index
* @return {object} Promise - Promise object which returns info about transaction
*/
exports.initializePollFromTemplate = function(path, iota_addr_ind) {

    const template = JSON.parse(fs.readFileSync(path));
    return new Promise((resolve, reject) => {

        generateIotaAddrs(iota_addr_ind).then((addr_arr) => {

            template.poll_address = addr_arr;
            // console.log("\n------------------------\n");
            // console.log(template);
            // console.log("\n------------------------\n");
            const tryteData = iota.utils.toTrytes(JSON.stringify(template));
            const transfer = [
                {
                    value : 0,
                    address :  addr_arr,
                    message : tryteData
                }
            ];

            iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {
                if (error) {
                    console.error("Failed to publish vote template to tangle")
                    reject(error);
                } else {
                    console.log("New poll successfully published: ", result);
                        resolve(parseTransaction(result));
                }
            });
        }).catch((err) => reject(err));
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
 * @param {int} iota_addr_ind - each unique poll MUST have a unique iota address generation index
 *
 * @throws exception if the poll ID is not unique
 * @throws exception if poll initialization message could not be attached to the tangle
 *
 * @return {object} Promise - Promise object which returns info about transaction
 */
exports.initializePoll = function(destination_account, vote_definitions,
                                  start_time, end_time, voter_identifiers,
                                  poll_operators, iota_addr_ind) {

    const poll_data = {
        "poll_address" : "",
        "destination_account" : destination_account,
        "vote_definition" : vote_definitions,
        "start_time" : start_time,
        "end_time" : end_time,
        "voter_identifiers" : voter_identifiers,
        "poll_operators" : poll_operators
    };

    return new Promise((resolve, reject) => {

        iota.api.getNewAddress(SEED, (error, new_addr) => {

            if (error) {
                console.error("Failed to generate new address poll init");
                reject(error);
                
            } else {

                poll_data.poll_address = new_addr;
                const tryteData = iota.utils.toTrytes(JSON.stringify(poll_data));
                const transfer = [
                            {
                                value : 0,
                                address :  new_addr,
                                message : tryteData
                            }
                ];

                iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {

                    if (error) {

                        console.error("Failed to publish vote template to tangle")
                        reject(error);

                    } else {

                        console.log("New poll successfully published: ", result);
                        resolve(parseTransaction(result));
                    }
                });
            }
        });
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

    /* Pretty sure this is no longer needed. */

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
 * @returns promise which returns a list of vote definitions
 */
exports.getVoteDefinitions = function(addr) {

    if (!addr) {
        return Promise.reject(
            new Error("Cannot get voter definitions with null address"));
    }

    return new Promise((resolve, reject) => {

        iota.api.findTransactionObjects(
            {
                addresses : [addr]
            },
            (err, result) => {

                if (err) {
                    
                    console.error("Failed to obtain voter defns with addr: ",
                                  addr);
                    reject(err);

                } else if (result.length === 0) {

                    reject(new Error("No voter defns are returned with addr: ",
                                     addr));
                    
                } else {

                    const response = parseTransactions(result);
                    defn = "";
                    for (var resp of response) {
                        if (resp.voter_definitions != undefined) {
                            defn = resp.voter_definitions
                        }
                    }
                    resolve(defn);
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
 * Example input: placeVote(res.address, "SSN-1001", [{President : "Bush"}, {Car : "Tesla"}, {Car : "Camry"}], pub_key)
 *
 * @param address
 * @param voter_id
 * @param responses
 * @param pub_key
 *
 * @throws exception if message could not be attached to tangle
 */
exports.placeVote = function(addr, voter_id, voter_responses, pub_key) {

    var data = {
        id : crypto.createHash("sha256").update(voter_id).digest("hex"),
        responses : voter_responses
    };

    const tryteData = iota.utils.toTrytes(encrypt(JSON.stringify(data), pub_key));
    const transfer = [
        {
            value : 0,
            address :  addr,
            message : tryteData
        }
    ];

    // console.log("Data: ", data);
    // console.log("Transfer: ", transfer[0]);
    
    return new Promise((resolve, reject) => {

        iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {

            if (error) {
                console.error("Failed to submit individual vote to the tangle");
                reject(error);
            } else {
                resolve(result)
            }
        });
    });
}


/**
 * Retrieve the IOTA destination account ID to which to send the message
 * containing the voting data. Since iota usese a 
 *
 * @returns the account ID of IOTA account to which to send the voting data
 */
 
exports.getDestinationAccount = function(addr) {

    if (!addr) {
        return Promise.reject(
            new Error("Cannot get voter definitions with null addr"));
    }

    return new Promise((resolve, reject) => {

        iota.api.findTransactionObjects(
            {
                addresses : [addr]
            },
            (err, result) => {

                if (err) {
                    
                    console.error("Failed to obtain voter definitions from poll_id: ", poll_id);
                    reject(err);

                } else if (result.length === 0) {

                    reject(new Error("No values returned from definitions"));

                } else {

                    const response = parseTransactions(result);
                    defn = "";
                    for (var resp of response) {
                        if (resp.destination_account != undefined) {
                            defn = resp.destination_account
                        }
                    }
                    resolve(defn);
                }              
            });
    });
}

/**
 * Retrieves tangle vote results and creates a ledger with tallies of every vote
 *
 * Returned ledger format:  ledger = [
 *                              "President" : {
 *                                  "Bush" : 10,
 *                                  "Reagan" : 54,
 *                                  "Clinton" : 0
 *                              },
 *                              ...
 *                          ]
 *
 * @param addr - destination address of poll
 * @param priv_key - private RSA key needed for decryption of voter data
 * @returns the account ID of IOTA account to which to send the voting data
 */
exports.countVotes = function(addr, priv_key) {
    if (!addr) {
        return Promise.reject(
            new Error("Cannot get voter definitions with null addr"));
    }

    return new Promise((resolve, reject) => {

        module.exports.getVoteDefinitions(addr)
        .then((defns) => {

            ledger = {}
            for (def of defns) {
                var responses = {};
                for (option in def.responses) {
                    responses[option] = 0;
                }
                ledger[def.title] = responses;
            }

            module.exports.queryAndDecryptTangle(addr, priv_key)
            .then((results) => {
                // TODO: I have to check for duplicates and stuff, make a set of IDs
                // TODO: Enforce min and max votes
                console.log("Results: ", results);
                for (transaction of results) {
                    if (transaction.responses != undefined) {
                        for (let property in transaction.responses) {
                            ledger[property][transaction.responses[property]]++;
                        }
                    }
                }
                resolve(ledger);
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}
