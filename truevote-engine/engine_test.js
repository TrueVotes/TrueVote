const engine = require("./truevote.js");
const cryptico = require('cryptico');

var PassPhrase = "The Moon is a Harsh Mistress."; 
var Bits = 1024; 
var priv_key = cryptico.generateRSAKey(PassPhrase, Bits);
var pub_key = cryptico.publicKeyString(priv_key);

// workable addresses:
// GXKXDJRTBQGHLZDGPMQPAGGRVABIAJTQTRSSL9GUDYRJROMJYCFRQXCOQFBIXCTNACABCCBTJRYAWROQD
// address1 = "AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9";
// address1 = 'HVJ9LPMLQONZNZDO9PEK9ZL9EIOZAEMPKYBPLKRTNDHDMSOOJKEZHWDQOFHHPFGQURDPHFUBMVBKIFWNW';
// address1 = "WENTXUXYZPBERNLUFSDBZCQGTOUAUELZUGW9FYKFADPAUIEMKBKTOJMEVDSQFCOCZQZVMKYGOQSKNLERB"
// address1 = "YTWELNXCDWPYK9GSUOQXXOBGHVWOARMEBYQDXJSODJHNMMEUZYXPSYBPXFOHQF9AIOMZSFIB9FOEEWZDW"
// address1 = "OZEDHXT9MYEFEUTOMTVHTXBFMGWXJQ9HLQKDZGYGYBHVUDKHAHS9GSHXTFAKLDWVELJEPJLBZXUJYWK9C";
// address1 = "ZEHBSE9QEI9PD9LMHHDDCMHGUYZXPQTJVOLRHCLUADQNTKGAHOIZUOLQAPMFWSYTKXYGVCVUJTQPSYZOC";
address1 = "DFCPLYXEEKIJXWPUDSKGBOOKVKHJS9UB9HNMXDSUL9JUSBDECUKFYZVMJDWB9DGVKCY9XQENIEQL9IRWD";

engine.node_info_test();
engine.initializePollFromTemplate("./demo.json", 1)
    .then((res) => {

        console.log("Init Poll Result = ", res);

        engine.queryTangle(res.address)
            .then((trans) => console.log("Can query by address: " + res + ":\n" + trans))
            .catch((err) => console.log("queryTangle failed: ", err));

        engine.getVoteDefinitions(res.address)
            .then((defns) => console.log("Can get vote defns: ", defns))
            .catch((err) => console.log("voteDefns failed: ", err));

        // console.log(res.address);
        // console.log(res.payload.poll_address);

        engine.getDestinationAccount(res.address)
            .then((account) => console.log("Can get destination account: ", account))
            .catch((err) => console.log("destAccount failed: ", err));

        // engine.placeVote(res.address, "SSN-1001", {President : "George"}, pub_key)
        //     .then((vote) => console.log("Vote successfully placed: ", vote))
        //     .catch((err) => console.log("plaveVote failed: ", err));

        // engine.placeVote(res.address, "SSN-1002", {dog : "golden"}, pub_key)
        //     .then((vote) => console.log("Vote successfully placed: ", vote))
        //     .catch((err) => console.log("plaveVote failed: ", err));

        // engine.placeVote(res.address, "SSN-1003", {President : "Reagan"}, pub_key)
        //     .then((vote) => console.log("Vote successfully placed: ", vote))
        //     .catch((err) => console.log("plaveVote failed: ", err));

        engine.placeVote(res.address, "SSN-1004", [{President : "Clinton"}, {Car : "Tesla"}], pub_key)
            .then((vote) => console.log("Vote successfully placed: ", vote))
            .catch((err) => console.log("plaveVote failed: ", err));
        
    }).catch((err) => console.error(err));



// engine.placeVote(address1, "SSN-1001", [{President : "George"}], pub_key)
//     .then((vote) => console.log("Vote successfully placed: ", vote))
//     .catch((err) => console.log("plaveVote failed: ", err));

// engine.placeVote(address1, "SSN-1002", [{dog : "golden"}], pub_key)
//     .then((vote) => console.log("Vote successfully placed: ", vote))
//     .catch((err) => console.log("plaveVote failed: ", err));

// engine.placeVote(address1, "SSN-1003", [{President : "Reagan"}], pub_key)
//     .then((vote) => console.log("Vote successfully placed: ", vote))
//     .catch((err) => console.log("plaveVote failed: ", err));

// engine.placeVote(address1, "SSN-1004", [{President : "Clinton"}, {Car : "Tesla"}], pub_key)
//     .then((vote) => console.log("Vote successfully placed: ", vote))
//     .catch((err) => console.log("plaveVote failed: ", err));










// engine.countVotes(address1, priv_key)
//     .then((results) => console.log("Obtained poll results:\n", results))
//     .catch((err) => {
//         // err_msg = "countVotes failed:" + err;
//         console.log(err);
//     });


// engine.getVoteDefinitions(address1)
//     .then((defns) => console.log("Can get vote defns: ", defns))
//     .catch((err) => console.log("voteDefns failed: ", err));

// engine.getDestinationAccount(address1)
//     .then((account) => console.log("Can get destination account: ", account))
//     .catch((err) => console.log("destAccount failed: ", err));


// engine.queryAndDecryptTangle("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9", priv_key)

// engine.queryAndDecryptTangle(address1, priv_key)
//     .then((trans) => console.log("Can query by address " + address1 + ":\n", trans))
//     .catch((err) => console.log("queryTangle failed: ", err));



// engine.queryTangle(address1, priv_key)
//     .then((trans) => console.log("Can query by address AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9:\n", trans))
//     .catch((err) => console.log("queryTangle failed: ", err));





// The passphrase used to repeatably generate this RSA key.
// var PassPhrase = "The Moon is a Harsh Mistress."; 

// // The length of the RSA key, in bits.
// var Bits = 1024; 

// var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

// console.log("private key:", MattsRSAkey);


// var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);

// console.log("public key:\n" + MattsPublicKeyString);

// var PlainText = "Matt, I need you to help me with my Starcraft strategy.";

// var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);

// console.log();
// CipherText = EncryptionResult.cipher;
// console.log("\nEncrypted Message:\n" + CipherText);

// // MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
// var DecryptionResult = cryptico.decrypt(CipherText, MattsRSAkey);
// console.log("\nDecrypted Message:\n" + DecryptionResult.plaintext);
