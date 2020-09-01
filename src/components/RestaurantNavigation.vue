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
                RESULTS {{categories}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-progress-linear
            :active="loading"
            indeterminate
            absolute
            color="accent"
        ></v-progress-linear>
      </template>

      <v-list dense class="pt-0">

        <v-list-item-group :value="res_index">
          <template v-for="(item,i) in search_result.restaurants">
            <v-divider :key="`divider-${i}`"></v-divider>
            <v-list-item link :key="`item-${i}`" @click="selected_restaurant=item; res_index=i">
              <v-list-item-content>
                <v-list-item-title class="font-weight-light body-2">
                  {{ item.restaurant.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>

        <template v-if="search_result.restaurants.length <= 0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light body-2">
                No Results
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>

      <template v-slot:append>
        <v-list dense>
          <v-list-item @click="loadMore()">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold overline">
                Load More
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import debounce from 'debounce';

export default {
  name: 'RestaurantNavigation',

  props:['drawer'],

  data: () => ({
    search_result : { restaurants:[] },
    res_index     : 0,
    loading       : false,
    city_id       : 297
  }),

  computed: {
    ...mapGetters({
      categories    : 'getSelectedCategories',
      cuisines      : 'getSelectedCuisines',
    }),

    drawer_status: {
      get () { return this.drawer },
      set (val) { this.$emit('setDrawer', val)}
    },

    selected_restaurant: {
      get () {
        return this.$store.state.selected_restaurant
      },
      set (val) {
        this.$store.commit('setSelectedRestaurants', val)
      }
    },

    start: {
      get () {
        return this.$store.state.search_start
      },
      set (val) {
        this.$store.commit('setSearchStart', val)
      }
    },

  },

  mounted () {
    this.search(true);
  },

  watch:{
    categories(val){
      this.$router.push({ path:'/',query: {category:val, cuisines:this.cuisines} });
      this.search();
    },

    cuisines(val){
      this.$router.push({ path:'/',query: {category:this.categories, cuisines:val} });
      this.search();
    },
  },


  methods:{

    // FETCH RESTAURANTS
    search: debounce(function(){

      this.loading = true;

      let params= {
        start     : 0,
        category  : this.categories,
        cuisines  : this.cuisines,
        city_id   : this.city_id,
      }

      this.$store.dispatch('fetchRestaurants', { params:params})
          .then(response => {

            this.search_result = response.data;

            if(response.data.restaurants.length > 0){
              this.res_index = 0;
              return;
            }

            this.res_index = -1;

          }).finally(()=>{
            this.loading = false;
      })
    }, 500),


    // LOAD NEXT 20 RESULTS
    loadMore(){
      this.loading = true;

      let params= {
        start     : this.start + 20,
        category  : this.categories,
        cuisines  : this.cuisines,
        city_id   : this.city_id,
      }

      this.$store.dispatch('fetchMoreRestaurants', { params:params})
          .then(response => {

            this.search_result.restaurants = this.search_result.restaurants.concat(response.data.restaurants);

          }).finally(()=>{
        this.loading = false;
      })
    }

  }
}
</script>

<style>
.v-list-item--active{ background:#50bebf; color:#ffffff!important; }
</style>
