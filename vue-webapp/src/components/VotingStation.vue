<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap justify-space-around>
        <v-flex style="margin:10px;">
          <v-card style="min-width: 350px;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Place a Vote </h2>
              </v-flex>
            </v-card-title>
          </v-card>


          <v-card style="margin-top:10px;">
            <v-flex
            v-for="(identifier, index) in voter_identifiers"
            :key="index"
            >
              <v-card-title>
                <v-layout row>
                  <v-text-field
                    name="voter_identifier"
                    label="voter_identifiers[index]"
                    id="voter_identifier"
                    type="username"
                    v-model="voter_identifier"
                    required/>
                  </v-text-field>
                </v-layout>
              </v-card-title>
            </v-flex>
          </v-card>
          
          <form>
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
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card style="margin-top:10px;">
              <v-card-text>
                <v-flex class="text-xs-center">
                  <v-btn v-on:click="create_poll" color="purple"
                  flat
                  outline
                  >
                    CREATE
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </form>
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
  import TrueVote from '../mixins/TrueVote.js'

  var Chance = require('chance');

  // Instantiate Chance so it can be used
  var chance = new Chance();

  export default {
    mixins: [TrueVote],
    data () {
      return {
        poll_id: null,
        dest_account: null,
        vote_title: null, 
        start_time: null,
        end_time: null,
        vote_definitions: [
        {title:'Edit Title', responses: ['Edit Response']}
        ],
        voter_identifiers: [
          "SSN", "Driver ID", "First Name", "Last Name"
        ],
        poll_operators: [
          ["Bob", "Jenna", "Jim"]
        ],
        iota_addr_ind: 20
      }
    },
    methods: {
      add_response(index) {
        this.vote_definitions[index].responses.push('Edit Response')
      },
      delete_response(index,response_index){
        this.vote_definitions[index].responses.splice(response_index, 1)
      },
      add_vote_definition() {
        this.vote_definitions.push({
          title: 'Edit Title',
          responses: ['Edit Response']
        })
      },
      delete_definition(index) {
        this.vote_definitions.splice(index, 1)
      },
      create_poll(){
        this.initializePoll(this.dest_account, this.vote_definitions,
          this.start_time, this.end_time, this.voter_identifiers,
          this.poll_operators, this.iota_addr_ind, this.seed,
          (error, result) => {
            if (error) {

                console.error("Failed to publish vote template to tangle")
                reject(error);

            } else {

                console.log("New poll successfully published: ", result);
                //resolve(self.parseTransaction(result));
                alert('Poll successfully published!')
            }
        });
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
