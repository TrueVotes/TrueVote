const engine = require("./truevote.js");
const cryptico = require('cryptico');
var PassPhrase = "The Moon is a Harsh Mistress."; 
var Bits = 1024; 
var priv_key = cryptico.generateRSAKey(PassPhrase, Bits);
var pub_key = cryptico.publicKeyString(priv_key);
const SEED = "QXNKQVF9LNTXUNTBMARCJGAVGSWRXHAQSCLBXJAUOHHXAFTRZN9ZEIQELPOB9KSCSSRSWKO9RUQISSFYM";

engine.node_info_test();
engine.initializePollFromTemplate("./demo.json", 2, SEED)
    .then((res) => {

        console.log("Poll Setup Complete, Result = ", res);

        console.log("-----Placing Votes------");
        engine.placeVote(res.payload.poll_address, "SSN-1001",
                         {
                             President : "Bush",
                             Car : "Jaguar"
                         },
                         pub_key, SEED)
            .then(() => {
                engine.placeVote(res.payload.poll_address, "SSN-1002",
                                 {
                                     President : "Clinton",
                                     Car : "Tesla"
                                 },
                                 pub_key, SEED)
                    .then(() => {

                        console.log("Votes successfully placed! Retrieving All Votes!");
                        console.log("-------------------------------------------------");

                        console.log("-----Retrieving/Decrypting the vote--------------");
                        engine.queryAndDecryptTangle(res.payload.poll_address, priv_key)
                            .then((results) => {
                                console.log("Vote Results: ", results);
                                console.log("------------------------------------------");

                                engine.countVotes(res.payload.poll_address, priv_key)
                                    .then((ledger) => {
                                        console.log("------Ledger Successfully Tallied!-------");
                                        console.log("Ledger = ", ledger);

                                    }).catch((err) => console.error("countVote failed: ", err));
                            }).catch((err) => console.error("queryAndDecrypt failed: ", err));
                    }).catch((err) => console.error("plaveVote failed: ", err));
            }).catch((err) => console.error("plaveVote failed: ", err));
    }).catch((err) => console.error(err));
