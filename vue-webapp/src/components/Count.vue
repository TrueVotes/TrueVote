<template>
  <v-container fluid>
    <v-layout row wrap justify-space-around>
      <v-layout column fluid>
        <v-flex style="margin:10px;">
          <v-card>
            <v-card-title>
              <h2 color = "purple">
                Form
              </h2>
            </v-card-title>
            <v-card-content>
            </v-card-content>
          </v-card>
          <v-card style="margin-top:10px;">
            <v-card-title>
              <v-form lazy-validate>
                <v-layout column>
                  <h2 color = "purple">
                    Content
                  </h2>
                  <v-flex>
                    <v-text-field
                      name="address"
                      label="Address"
                      id="address"
                      type="username"
                      :rules="[v => !!v || 'Key is required',
                      , v => v.length == 81 || 'Key must be 81 characters long.']"
                      v-model="address"
                      multi-line
                      rows="2"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="private_key"
                      label="Private Key"
                      id="private_key"
                      type="username"
                      v-model="private_key"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-center">
                    <v-btn
                    v-on:click=""
                    flat
                    outline
                    color="primary"
                    >
                      Update
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
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
                Data
              </h2>
            </v-card-title>
          </v-card>
          <v-card style="margin-top:10px;">
          	<v-layout 
              v-for="record in ledger"
              column>
	            <v-card-content>
              		{{record.title}}
	            </v-card-content>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
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
        address: '',
        private_key: ''
      }
    },
    mounted() {
      this.private_key = this.$route.query.private_key
      this.address = this.$route.query.address
      this.ledger = [{title: 'guy'}]
      this.countVotes(this.address, this.private_key)
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
