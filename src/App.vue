<template>
  <div id="app">

    <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
    >
      <v-list dense>
        <template v-for="item in search_result.restaurants">
          <v-list-item link :key="item.restaurant.id">
            <v-list-item-action>
              <v-icon>mdi-contacts</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.restaurant.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        :height="200"
        class="elevation-0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" md="6" lg="4">A</v-col>
          <v-col cols="12" md="6" lg="4">B</v-col>
          <v-col cols="12" md="12" lg="4">C</v-col>
        </v-row>
      </v-container>

    </v-app-bar>
    <v-main>
      <v-container
          class="fill-height"
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >
          {{ search_result }}
        </v-row>
      </v-container>
    </v-main>


  </div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    drawer: null,
    selected_restaurant: null
  }),

  computed: {
    ...mapGetters({
      search_result: 'getSearchResult',
    }),
  },

  mounted () {
    let params= {
      start     : 0,
      count     : 20,
      cuisines  : 1035
    }
    this.$store.dispatch('fetchRestaurants', params)
  }
}
</script>

<style lang="scss">
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
