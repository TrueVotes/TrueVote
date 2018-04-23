<template>
  <v-container fluid>
    <v-layout row fluid>
      <v-layout column>

        <v-flex style="margin:10px;">
          <v-card style="min-width: 350px;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Vote successfully submitted! </h2>
                <br>
                <p>Please turn the computer back over to the polling operator.</p>
              </v-flex>
            </v-card-title>
          </v-card>

          <v-card style="margin-top:10px;">
            <v-card-text>
              <v-flex class="text-xs-center">
                <v-btn v-on:click="on_exit" color="purple"
                flat
                outline
                >
                  Exit
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-layout>
  </v-container>
</template>


<script>
  import router from '@/router'
  import TrueVote from '../mixins/TrueVote.js'

export default {

  methods: {
    on_exit() {
      router.push('/votingStation')
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
