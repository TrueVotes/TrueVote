<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap justify-space-around>
        <v-flex style="margin:10px;">
          <v-card style="min-width: 350px;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Open Poll for Voter </h2>
                Please enter the appropriate identification information for the voter
              </v-flex>
            </v-card-title>
          </v-card>
          
          <v-form 
          v-model="valid"
          ref="voter_identification_form"
          @success = ""
          lazy-validation
          >
            <v-card style="min-width: 350px;margin-top:10px;">
              <v-card-text>
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      name="first_name"
                      label="First Name"
                      id="first_name"
                      type="username"
                      v-model="first_name"
                      multi-line
                      :rules="[v => !!v || 'Required']"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="last_name"
                      label="Last Name"
                      id="last_name"
                      type="username"
                      v-model="last_name"
                      multi-line
                      :rules="[v => !!v || 'Required']"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="license_num"
                      label="GTID"
                      id="license_num"
                      type="username"
                      v-model="license_num"
                      multi-line
                      :rules="[v => !!v || 'Required']"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card style="margin-top:10px;">
              <v-card-text>
                <v-flex class="text-xs-center">
                  <v-btn v-on:click="on_open_poll" color="purple"
                  flat
                  outline
                  >
                    Open Poll
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-form>
        </v-flex>

        <v-flex style="margin:10px;">
          <v-card>
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Exit Voting Session </h2>
              </v-flex>
            </v-card-title>
          </v-card>
          <form>
            <v-card style="margin-top:10px;">
              <v-card-text>
                <v-flex class="text-xs-center">
                  <v-btn v-on:click="exit_voting_session" color="purple"
                  flat
                  outline
                  >
                    Exit
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </form>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import router from '@/router'
  import TrueVote from '../mixins/TrueVote.js'

  var Chance = require('chance');

  // Instantiate Chance so it can be used
  var chance = new Chance();

  export default {
    mixins: [TrueVote],
    data () {
      return {
        voter_identifiers: [
          "SSN", "Driver ID", "First Name", "Last Name"
        ]
      }
    },
    methods: {
      on_open_poll() {
        if (this.$refs.voter_identification_form.validate()) {
          router.push('/vote')
        }
      },
      exit_voting_session() {
        router.push('/')
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
