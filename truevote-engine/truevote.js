var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: `http://eugene.iota.community:14265` })


exports.send_vote = function() {
  console.log('Beginning send_vote function.')
}

exports.get_poll_results = function() {
  console.log('Beginning get_poll_results function.')
}