<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="purple"
    >
      <v-toolbar-title style="margin-right:20px;">
        <router-link to="/" tag="span" style="cursor: pointer;color: white;">
            TrueVote
        </router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
      color="white"
    >
      <span style="color:black"> {{ text }} </span>
      <v-btn flat color="purple" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>

  import TrueVote from './mixins/TrueVote.js'
  import Vue from 'vue';
  import Vuetify from 'vuetify'

  Vue.use(Vuetify, {
    theme: {
      primary: '#9A30AE',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  })

  export default {
    mixins: [TrueVote],
    data () {
      return {
        snackbar: false,
        mode: '',
        y: 'top',
        x: null,
        timeout: 6000,
        text: 'Clearance updated.',
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
        main_store: {
          iota_wallet_seed: null,
          poll_key: null,
          private_key: null
        }
      }
    },
    methods: {

    },
    name: 'App',
    mounted() {
      console.log('mounted....')
    }
  }
</script>
