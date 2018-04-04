const engine = require("./truevote.js");

engine.node_info_test();

engine.initializePollFromTemplate("./demo.json")
    .then((res) => {

        console.log("Raw Result = ", res);

        engine.queryTangle(res.address)
            .then((trans) => console.log("Can query by address: ", trans))
            .catch((err) => console.log("queryTangle failed: ", err));

        engine.getVoteDefinitions(res.address)
            .then((defns) => console.log("Can get vote defns: ", defns))
            .catch((err) => console.log("voteDefns failed: ", err));

        engine.getDestinationAccount(res.address)
            .then((account) => console.log("Can get destination account: ", account))
            .catch((err) => console.log("destAccount failed: ", err));

        
    }).catch((err) => console.error(err));


