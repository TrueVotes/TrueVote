<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap justify-space-around>
        <v-flex style="margin:10px;">
          <v-card style="min-width: 350px;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Vote Definitions </h2>
              </v-flex>
            </v-card-title>
          </v-card>
          <v-flex
          v-for="(vote_def, index) in vote_definitions"
          :key="index"
          >
            <v-card style="margin-top:10px;">
              <v-card-title>
                <v-layout row>
                  <v-text-field
                    name="vote_def_title"
                    label="Definition Title"
                    id="end_time"
                    type="username"
                    v-model="vote_def.title"
                    required/>
                  </v-text-field>
                  <v-btn
                  flat
                  outline
                  v-on:click="delete_definition(index)">
                    Delete Definition
                  </v-btn>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout 
                v-for="(response, response_index) in vote_def['responses']"
                :key="response_index"
                row>
                  <v-text-field
                    name="vote_def_title"
                    label="Response"
                    id="end_time"
                    type="username"
                    v-model="vote_def['responses'][response_index]"
                    required/>
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn
                  icon
                  v-on:click="delete_response(index, response_index)"
                  >
                    <v-icon> delete </v-icon>
                  </v-btn>
                </v-layout>
                <v-flex class="text-xs-right">
                  <v-btn
                  icon
                  v-on:click="add_response(index)"
                  >
                    <v-icon> add </v-icon>
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-card style="min-width: 350px;margin-top:10px;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <v-btn
                  v-on:click="add_vote_definition"
                  >
                    <v-icon> add </v-icon>
                  </v-btn>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex style="margin:10px;">
          <v-card>
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Create Poll </h2>
              </v-flex>
            </v-card-title>
          </v-card>
          <form>
            <v-card style="min-width: 350px;margin-top:10px;">
              <v-card-text>
                <v-layout column>
                <v-flex>
                  <v-text-field
                    name="poll_id"
                    label="Poll ID"
                    id="poll_id"
                    type="poll_id"
                    v-model="poll_id"
                    required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="dest_account"
                      label="Destination Account"
                      id="dest_account"
                      type="username"
                      v-model="dest_account"
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="vote_title"
                      label="Vote Title"
                      id="vote_title"
                      type="username"
                      v-model="vote_title"
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="start_time"
                      label="Start Time"
                      id="start_time"
                      type="username"
                      v-model="start_time"
                      required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="end_time"
                      label="End Time"
                      id="end_time"
                      type="username"
                      v-model="end_time"
                      required></v-text-field>
                  </v-flex>
                  <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                    <p> Member does not exist </p>
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
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import TrueVote from '../mixins/TrueVote.js'

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
          this.poll_operators, this.iota_addr_ind,
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
