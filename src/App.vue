<template>
  <div id="app">
    <v-app>
      <restaurant-navigation :drawer="drawer" @setDrawer="drawer=$event"></restaurant-navigation>

      <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="white"
          :height="$vuetify.breakpoint.mdAndDown ? 0 : 200"
          class="elevation-0"
      >
        <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <filters v-if="$vuetify.breakpoint.mdAndUp"></filters>
      </v-app-bar>

      <v-main>
        <filters v-if="$vuetify.breakpoint.mdAndDown"></filters>

        <v-container fluid>
          <v-row align="center" justify="center">
            {{ search_result.restaurants }}
          </v-row>
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import restaurantNavigation from './components/RestaurantNavigation'
import filters from './components/Filters'

export default {
  name: 'App',

  data: () => ({
    drawer: null,
  }),

  components:{
    restaurantNavigation,
    filters
  },

  computed: {
    ...mapGetters({
      search_result : 'getSearchResult',
    }),
  },

  mounted () {

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
