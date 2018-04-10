const engine = require("./truevote.js");
const cryptico = require('cryptico');

var PassPhrase = "The Moon is a Harsh Mistress."; 
var Bits = 1024; 
var priv_key = cryptico.generateRSAKey(PassPhrase, Bits);
var pub_key = cryptico.publicKeyString(priv_key);

// workable addresses:
// GXKXDJRTBQGHLZDGPMQPAGGRVABIAJTQTRSSL9GUDYRJROMJYCFRQXCOQFBIXCTNACABCCBTJRYAWROQD
// AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9

// engine.node_info_test();

// engine.initializePollFromTemplate("./demo.json")
//     .then((res) => {

//         console.log("Raw Result = ", res);

//         engine.queryTangle(res.address)
//             .then((trans) => console.log("Can query by address: " + res + ":\n" + trans))
//             .catch((err) => console.log("queryTangle failed: ", err));

//         engine.getVoteDefinitions(res.address)
//             .then((defns) => console.log("Can get vote defns: ", defns))
//             .catch((err) => console.log("voteDefns failed: ", err));

//         engine.getDestinationAccount(res.address)
//             .then((account) => console.log("Can get destination account: ", account))
//             .catch((err) => console.log("destAccount failed: ", err));

//         engine.placeVote(res.address, "SSN-1001", {president : "george"}, pub_key)
//             .then((vote) => console.log("Vote successfully placed: ", vote))
//             .catch((err) => console.log("plaveVote failed: ", err));
        
//     }).catch((err) => console.error(err));



// engine.placeVote("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9", "SSN-1002", {president : "drumpf"}, pub_key)
//     .then((vote) => console.log("Vote successfully placed: ", vote))
//     .catch((err) => console.log("plaveVote failed: ", err));




// engine.getVoteDefinitions("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9")
//     .then((defns) => console.log("Can get vote defns: ", defns))
//     .catch((err) => console.log("voteDefns failed: ", err));

// engine.getDestinationAccount("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9")
//     .then((account) => console.log("Can get destination account: ", account))
//     .catch((err) => console.log("destAccount failed: ", err));

engine.queryAndDecryptTangle("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9", priv_key)
    .then((trans) => console.log("Can query by address AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9:\n", trans))
    .catch((err) => console.log("queryTangle failed: ", err));



// engine.queryTangle("AGVVRXSWLWSRWRRJGYYRGEZPJDPVUFPWXIHQQRHSHXNPIAHTNQBAANMDQLXKYOJEWWOPPKWZPAJG9DWE9", priv_key)
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





