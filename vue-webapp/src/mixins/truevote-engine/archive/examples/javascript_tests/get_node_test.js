var IOTA = require('iota.lib.js')


// Create IOTA instance with host and port as provider
// var iota = new IOTA({
//     'host': 'http://localhost',
//     'port': 14265
// });

// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://eugene.iota.community:14265'
});

var seed;
var address = 

// now you can start using all of the functions
iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
});

// you can also get the version
console.log(iota.version);

var transfer = {
  "address": address,
  "value": value,
  "message": message,
  "tag": tag
}

iota.api.sendTrytes(trytes, depth, minWeightMagnitude, callback)





