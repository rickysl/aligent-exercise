<template>
  <v-container>
    <v-navigation-drawer
        v-model="drawer_status"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color="#e5e5e5"
    >
      <template v-slot:prepend>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold overline">
                RESULTS
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-progress-linear
            :active="overlay"
            indeterminate
            absolute
            color="accent"
        ></v-progress-linear>
      </template>

      <v-list dense class="pt-0">
        <v-list-item-group active-class="active_restaurant">
          <template v-for="(item,i) in search_result.restaurants">
            <v-divider :key="`divider-${i}`"></v-divider>
            <v-list-item link :key="`item-${i}`">
              <v-list-item-content>
                <v-list-item-title class="font-weight-light body-2">
                  {{ item.restaurant.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RestaurantNavigation',

  props:['drawer'],

  data: () => ({
    selected_restaurant: null
  }),

  computed: {
    ...mapGetters({
      search_result : 'getSearchResult',
      categories    : 'getSelectedCategories',
      cuisines      : 'getSelectedCuisines',
      overlay       : 'getNavOverlay',
    }),

    drawer_status: {
      get () { return this.drawer },
      set (val) { this.$emit('setDrawer', val)}
    }
  },

  mounted () {
    this.search();
  },

  watch:{
    categories(){
      this.search();
    },

    cuisines(){
      this.search();
    },
  },

  methods:{
    search(){
      let params= { params:{
          start     : 0,
          count     : 20,
          cuisines  : this.cuisines,
          category  : this.categories,
        }
      }
      this.$store.dispatch('fetchRestaurants', params)
    }
  }
}
</script>

<style>
.active_restaurant{ background:#50bebf; color:#ffffff!important; }
</style>
