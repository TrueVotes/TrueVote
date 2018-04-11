<template>
  <v-container fluid>
    <v-layout row wrap>
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
        <v-card style="background-color:#ffffff;opacity:0.9">
          <form @submit.prevent=""  @success="">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Vote </h2>
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
                    v-model="iota_wallet_seed"
                    required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    name="poll_key"
                    label="Poll Key"
                    id="poll_key"
                    type="username"
                    v-model="poll_key"
                    required></v-text-field>
                </v-flex>
                <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                  <p> Member does not exist </p>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn v-on:click="userLogin"  color="purple"
                  flat
                  outline
                  >
                    Login
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </form>
        </v-card>
      </v-flex>
      <v-flex style="margin:10px;">
        <v-card style="background-color:#ffffff;opacity:0.9">
          <form @submit.prevent=""  @success="">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Count </h2>
              </v-flex>
            </v-card-title>
            <v-card-text>
              <v-layout column>
                <v-flex>
                  <v-text-field
                    name="private_key"
                    label="Private Key"
                    id="private_key"
                    type="username"
                    v-model="private_key"
                    required></v-text-field>
                </v-flex>
                <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                  <p> Member does not exist </p>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn v-on:click="userLogin"  color="purple"
                  flat
                  outline
                  >
                    Start
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import router from '@/router'

  export default {
    data() {
      return {
        iota_wallet_seed: null,
        poll_key: '',
        private_key: null
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
