var Mam = require('../lib/mam.node.js')
var IOTA = require('iota.lib.js')
var iota = new IOTA({ provider: `http://eugene.iota.community:14265` })

// Initialise MAM State - PUBLIC
var mamState = Mam.init(iota)

export function send_vote() {
  console.log('Beginning send_vote function.')
}

export function get_poll_results() {
  console.log('Beginning get_poll_results function.')
}