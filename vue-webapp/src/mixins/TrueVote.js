//API JAVASCRIPT MIXIN

// define a mixin object
import Vue from 'vue';
import router from '@/router'
const IOTA = require('iota.lib.js');
const fs = require('fs');
const crypto = require('crypto');
const cryptico = require('cryptico');


const FULL_NODE_ADDR = "https://field.carriota.com:443";
// const SEED = "OLXCLVSZONEYGZHWRQYGWYLCECRNVREEJVCPEWVOYCKYGFLXPERVWRDM9W9GYWMJUJRWCVSXLRLFSNTRX";
// const SEED = "PTDOUAJJKHR9PUKHJVUNBWXEHPRA9YSLBQEFRJSAFPUM9ILJPJVSDGMKQZLAFZUAVIKZHKGEMCFUEEORE";
const SEED = "VZEWUEULPBTWML9BFKIKRZQLTNCTXDUW9KRPDOCXCOHCRZNGTMPDW9SMURQSSQZDJEBVVBPWSSXBIKSHP";

const iota = new IOTA({
    provider: FULL_NODE_ADDR
});

export default {
  data () {
  	return {
  		seed: 'VZEWUEULPBTWML9BFKIKRZQLTNCTXDUW9KRPDOCXCOHCRZNGTMPDW9SMURQSSQZDJEBVVBPWSSXBIKSHP',
      FULL_NODE_ADDRESS: "https://field.carriota.com:443"
  	}
  },
  methods: {
    node_info_test() {
      iota.api.getNodeInfo((err, success) => {
        if (err) {
            console.error(err);
        } else {
            console.log(success);
            alert(JSON.stringify(success))
        }
      });
    },
    encrypt(msg, pub_key) {
    return cryptico.encrypt(msg, pub_key).cipher;
    },
    decrypt(msg, priv_key) {
      return cryptico.decrypt(msg, priv_key);
    },
    decryptTransaction(data, priv_key) {
    return cryptico.decrypt(data, priv_key);
    },
    encryptTransaction(data, priv_key) {
      return cryptico.encrypt(msg, pub_key).cipher;
    },
    parseAndDecryptQuery(iota_response, priv_key) {
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
    },
    parseTrytePayload(iota_payload) {
      if (iota_payload.length % 2 !== 0) {
          iota_payload = iota_payload.substring(0, iota_payload.length - 1);
      }
      var obj = iota.utils.fromTrytes(iota_payload);
      obj = obj.substring(0, obj.indexOf("\u0000"));
      return obj;
    },
    parseTransactions(iota_response) {
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
    },
    queryTangle (addr) {
      if (!addr) {
          return Promise.reject(new Error("Cannot query on null address"));
      }
      var self = this;
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
                      //resolve(self.parseTransactions(result));
                  }
              }
          );
      });
    },
    queryAndDecryptTangle (addr, priv_key) {
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
                resolve(parseAndDecryptQuery(result, priv_key));
            }
          }
        );
      });
    },
    generateIotaAddrs(ind) {
      return new Promise((resolve, reject) => {
        iota.api.getNewAddress(SEED, {index : ind}, (error, new_addrs) => {
            if (error) {
                console.error("Failed to generate a new address");
                reject(error);
            } else {
                console.log(new_addrs);
                resolve(new_addrs);
            }
        });
      });
    },
    initializePoll(destination_account, vote_definitions,
                                  start_time, end_time, voter_identifiers,
                                  poll_operators, iota_addr_ind, seed, on_initialize) {
      const poll_data = {
          "poll_address" : "",
          "destination_account" : destination_account,
          "vote_definition" : vote_definitions,
          "start_time" : start_time,
          "end_time" : end_time,
          "voter_identifiers" : voter_identifiers,
          "poll_operators" : poll_operators
      };

      var self = this;

      return new Promise((resolve, reject) => {

          self.generateIotaAddrs(iota_addr_ind).then((addr_arr) => {

            poll_data.poll_address = addr_arr;
            const tryteData = iota.utils.toTrytes(JSON.stringify(poll_data));
            const transfer = [
                {
                    value : 0,
                    address :  addr_arr,
                    message : tryteData
                }
            ];

            iota.api.sendTransfer(seed, 1, 14, transfer, (error, result) => {
                if (error) {
                    console.error("Failed to publish vote poll_data to tangle")
                    reject(error);
                } else {
                    console.log("New poll successfully published: ", result);
                        resolve(parseTransaction(result));
                }
            });

          }).catch((err) => reject(err));

      });
    },
    getVoteDefinitions(addr, ret_promise) {
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
    },
    placeVote(addr, voter_id, voter_responses, pub_key) {

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

      console.log("Data: ", data);
      console.log("Transfer: ", transfer[0]);
      
      return new Promise((resolve, reject) => {

        iota.api.sendTransfer(SEED, 1, 14, transfer, (error, result) => {

          if (error) {
              console.error("Failed to submit individual vote to the tangle");
              reject(error);
          } else {
              console.log("Vote Successfully Placed");
              resolve(result)
          }
        });
      });
    },
    countVotes(addr, priv_key) {
      if (!addr) {
          return Promise.reject(
              new Error("Cannot get voter definitions with null addr"));
      }

      return new Promise((resolve, reject) => {

      this.getVoteDefinitions(addr)
        .then((defns) => {
          ledger = {}
          for (def of defns) {
            var responses = {};
            for (option in def.responses) {
              responses[option] = 0;
            }
            ledger[def.title] = responses;
          }
          this.queryAndDecryptTangle(addr, priv_key)
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
  }
}








