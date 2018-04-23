<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-layout column>
        <v-flex style="margin:10px;">
          <v-card style="background-color:#ffffff;opacity:0.9;">
            <form @submit.prevent=""  @success="">
              <v-card-title>
                <v-flex class="text-xs-center" style="margin-top:0px;">
                  <h2> Create Poll </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout column>
                  <v-flex class="text-xs-center">
                    <v-btn to="/create" color="purple"
                    flat
                    outline
                    >
                      Create
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </form>
          </v-card>
        </v-flex>

        <v-flex style="margin:10px;">
          <v-card style="background-color:#ffffff;opacity:0.9;">
            <form @submit.prevent=""  @success="">
              <v-card-title>
                <v-flex class="text-xs-center" style="margin-top:0px;">
                  <h2> Test Node </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout column>
                  <v-flex class="text-xs-center">
                    <v-btn v-on:click="node_info_test" color="purple"
                    flat
                    outline
                    >
                      Test
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </form>
          </v-card>
        </v-flex>

        <v-flex style="margin:10px;">
          <v-card style="background-color:#ffffff;opacity:0.9;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Generate Key </h2>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-layout column>
                <v-form 
                lazy-validate 
                ref="generate_rsa_form"
                v-model="generate_rsa_valid">
                  <v-flex>
                    <v-text-field
                      name="passphrase"
                      label="Passphrase"
                      id="passphrase"
                      type="username"
                      :rules="[v => !!v || 'Key is required']"
                      v-model="passphrase"
                      required></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-center">
                    <v-btn v-on:click="generate_rsa" color="purple"
                    flat
                    outline
                    >
                      Generate
                    </v-btn>
                  </v-flex>
                </v-form>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>

      <v-flex style="margin:10px;">
        <v-card style="background-color:#ffffff;opacity:0.9">
          <v-form 
          v-model="valid"
          ref="vote_station_form"
          @success = ""
          lazy-validation
          >
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Set Up Voting Station </h2>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-layout column>
                <v-flex>
                  <v-text-field
                    name="iota_wallet_seed"
                    label="IOTA Wallet Seed"
                    id="iota_wallet_seed"
                    type="username"
                    multi-line
                    rows="3"
                    v-model="iota_wallet_seed"
                    required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    name="poll_key"
                    label="Encryption Key"
                    id="poll_key"
                    type="username"
                    v-model="poll_key"
                    multi-line
                    :rules="[v => !!v || 'Encryption key required']"
                    required>
                  </v-text-field>
                  <v-text-field
                    name="session_password"
                    label="Session Password"
                    id="session_password"
                    type="username"
                    v-model="session_password"
                    multi-line
                    :rules="[v => !!v || 'Session password required',
                    , v => v.length >= 8 || 'Password must be at least 8 characters long.']"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn  
                  color="purple"
                  flat
                  outline
                  v-on:click="on_start_voting_station"
                  >
                    Set Up
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>

      <v-flex style="margin:10px;">
        <v-card style="background-color:#ffffff;opacity:0.9">
          <v-form 
          v-model="valid"
          ref="count_form"
          @success = ""
          lazy-validation
          >
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Count </h2>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-layout column>
                <v-flex>
                  <v-flex>
                    <v-text-field
                      name="address"
                      label="Address"
                      id="address"
                      type="username"
                      v-model="address"
                      multi-line
                      rows="3"
                      :rules="[v => !!v || 'Key is required',
                      , v => v.length == 81 || 'Key must be 81 characters long.']"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-text-field
                    name="private_key"
                    label="Decryption Key"
                    id="private_key"
                    type="username"
                    v-model="private_key"
                    multi-line
                    :rules="[v => !!v || 'Decryption key required']"
                    required></v-text-field>
                </v-flex>
                <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                  <p> Member does not exist </p>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn  
                  color="purple"
                  flat
                  outline
                  v-on:click="count_votes"
                  >
                    Start
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import router from '@/router'
  import TrueVote from '../mixins/TrueVote.js'

  var cryptico = require('cryptico')

  var Bits = 1024; 

  export default {
    mixins: [TrueVote],
    data() {
      return {
        valid: true,
        generate_rsa_valid: true,
        iota_wallet_seed: '',
        poll_key: '',
        address: '',
        private_key: '',
        passphrase: '',
        rules: [
          () => 'Username or Password is incorrect'
        ]
      }
    },
    methods: {
      on_start_voting_station() {
        if (this.$refs.vote_station_form.validate()) {
          router.push('/votingStation?wallet_seed='+this.iota_wallet_seed
            +'&poll_key='+this.poll_key)
        }
      },
      count_votes() {
        if (this.$refs.count_form.validate()) {
          router.push('/count?private_key='+this.private_key+'&address='+this.address)
        }
      },
      on_test() {
        this.node_info_test()
      },
      generate_rsa() {
        if (this.$refs.generate_rsa_form.validate()) {
          var rsa_key = cryptico.generateRSAKey(this.passphrase, Bits);
          var public_key = cryptico.publicKeyString(rsa_key);
          alert('public key: ' + public_key + '\n\n' + 'private_key: ' + str(rsa_key) )
        }
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
