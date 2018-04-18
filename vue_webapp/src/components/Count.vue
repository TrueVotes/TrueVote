<template>
  <v-container fluid>
    <v-layout row fluid>
      <v-layout column>
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
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data () {
      return {
        private_key: ''
      }
    },
    mounted() {
      this.private_key = this.$route.query.private_key
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
