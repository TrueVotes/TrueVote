<template>
  <v-container fluid>
    <v-layout row fluid>
      <v-layout column>
        <v-flex style="margin:10px;">
          <v-card>
            <v-card-title>
              <h2 color = "purple">
                Vote
              </h2>
            </v-card-title>
            <v-card-content>
            </v-card-content>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout column>
        <v-flex style="margin:10px;">
          <v-card>
            <v-card-title>
              <h2 color = "purple">
                Submit
              </h2>
            </v-card-title>
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
      voter_definitions: null
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
          this.voter_definitions = this.parseTransactions(result);
          // defn = "";
          // for (var resp of response) {
          //     if (resp.voter_definitions != undefined) {
          //         defn = resp.voter_definitions
          //     }
          // }
          //resolve(defn);
          alert(this.voter_definitions)
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
