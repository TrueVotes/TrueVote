const engine = require("./truevote.js");

engine.node_info_test();
engine.initializePollFromTemplate("./demo.json")
    .then((res) => {

        console.log("Result = ", res);

        engine.queryTangle(res.address)
            .then((trans) => console.log("Can query by address: ", trans))
            .catch((err) => console.log("queryTangle failed: ", err));

        engine.getVoteDefinitions(res.tryte_tag)
            .then((defns) => console.log("Can get vote defns: ", defns))
            .catch((err) => console.log("voteDefns failed"));

        engine.getDestinationAccount(res.tryte_tag)
            .then((account) => consle.log("Can get destination account: ", account))
            .catch((err) => console.log("destAccount failed"));

        
    }).catch((err) => console.error(err));


