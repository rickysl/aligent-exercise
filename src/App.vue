<template>
  <div id="app">
    <v-app>
      <!-- NAVIGATION DRAWER -->
      <restaurant-navigation :drawer="drawer" @setDrawer="drawer=$event"></restaurant-navigation>

      <!-- TITLE BAR -->
      <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="white"
          :height="$vuetify.breakpoint.mdAndDown ? 0 : 200"
          class="elevation-0"
      >
        <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <!-- FILTERS -->
        <filters v-if="!$vuetify.breakpoint.mdAndDown"></filters>
      </v-app-bar>

      <!-- BODY -->
      <v-main>
        <v-container v-if="$vuetify.breakpoint.mdAndDown">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Filters</v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- FILTERS -->
                <filters></filters>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>

        <!-- RESTAURANT DETAILS -->
        <v-container fluid>
          <restaurant-details></restaurant-details>
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
import restaurantNavigation from './components/RestaurantNavigation'
import filters from './components/Filters'
import restaurantDetails from './components/RestaurantDetails'

export default {
  name: 'App',

  data: () => ({
    drawer: null,
  }),

  components:{
    restaurantNavigation,
    filters,
    restaurantDetails
  },

  beforeMount () {
    // SET STATE FROM ROUTER PARAMS
    if(this.$route.query.category){
      this.$store.commit('setSelectedCategories', this.$route.query.category.replace(/, +/g, ",").split(",").map(Number))
    }

    // SET STATE FROM ROUTER PARAMS
    if(this.$route.query.cuisines){
      this.$store.commit('setSelectedCuisines', this.$route.query.cuisines.replace(/, +/g, ",").split(",").map(Number))
    }

  }
}
</script>

<style lang="scss">
.v-main { background: #f1f1f1; }
</style>
