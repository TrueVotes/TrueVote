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
      </v-layout>
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
                  <v-btn v-on:click="go_vote"  color="purple"
                  flat
                  outline
                  >
                    Vote
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </form>
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
                  <v-text-field
                    name="private_key"
                    label="Private Key"
                    id="private_key"
                    type="username"
                    :rules="[v => !!v || 'Name is required']"
                    v-model="private_key"
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

  export default {
    mixins: [TrueVote],
    data() {
      return {
        valid: true,
        iota_wallet_seed: '',
        poll_key: '',
        private_key: '',
        rules: [
          () => 'Username or Password is incorrect'
        ]
      }
    },
    methods: {
      go_vote() {
        router.push('/vote?wallet_seed='+this.iota_wallet_seed
          +'&poll_key='+this.poll_key)
      },
      count_votes() {
        if (this.$refs.count_form.validate()) {
          router.push('/count?private_key='+this.private_key)
        }
      },
      on_test() {
        this.node_info_test()
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
