<template>
  <v-container fluid>
    <v-layout row fluid>
      <v-layout column>
        <v-flex style="margin:10px;">

            <v-flex
            v-for="(vote_def, index) in vote_definitions"
            :key="index"
            >
              <v-card style="margin-top:10px;">
                <v-card-title>

                  <v-layout row>
                    <h2>{{vote_def.title}}</h2>
                  </v-layout>
                </v-card-title>

                <v-card-text>
                  <div id='responses-index'>

                    <v-layout 
                    v-for="(response, response_index) in vote_def['responses']"
                    :key="response_index"
                    row>

                      <input type="checkbox" id=response value=response v-model="checkedNames">
                      <label for=response> {{response}} </label><br>

                    </v-layout>
                  </div>
                </v-card-text>

              </v-card>
            </v-flex>

              <v-card style="margin-top:10px;">
                <form @submit.prevent=""  @success="">
                  <v-card-text>
                    <v-layout column>
                      <v-flex class="text-xs-center">
                        <v-btn to="/submit" color="purple"
                        flat
                        outline
                        >
                          Submit
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </form>
              </v-card>

          </v-card>
        </v-flex>
      </v-layout>

    </v-layout>
  </v-container>
</template>


<script>

export default {
  data () {
    return {
      iota_wallet_seed: '',
      poll_key: '',
      vote_definitions: [
        {title:'President', responses: ['candidate 1', 'candidate 2', 'candidate 3']},
        {title: 'VP', responses: ['candidate 4', 'candidate 5']}
        ]
    }
  },

  methods: {
    get_definitions() {
      getVoteDefinitions(addr, (err, result) => {
        if (err) {
          console.error("Failed to obtain voter defns with addr: ", addr);
          reject(err);

        } else if (result.length === 0) {

          reject(new Error("No voter defns are returned with addr: ",
                           addr));
        } else {
          this.vote_definitions = this.parseTransactions(result);
          // defn = "";
          // for (var resp of response) {
          //     if (resp.voter_definitions != undefined) {
          //         defn = resp.voter_definitions
          //     }
          // }
          //resolve(defn);
          alert(this.vote_definitions)
        }
      })
    }
  },
  mounted() {
    this.iota_wallet_seed = this.$route.query.wallet_seed
    this.poll_key = this.$route.query.poll_key
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
