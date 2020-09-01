<template>
  <v-container>
    <v-row justify="center" v-if="selected_restaurant !== null">
      <v-col cols="12" md="5">
        <v-img
            :src="selected_restaurant.restaurant.featured_image ? selected_restaurant.restaurant.featured_image : 'https://via.placeholder.com/500x500?text=No+Image'"
            :lazy-src="selected_restaurant.restaurant.thumb"
            aspect-ratio="1"
            class="grey"
        >
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
              <v-progress-circular indeterminate color="accent"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="12" md="7">
        <h1>{{ selected_restaurant.restaurant.name }}</h1>
        <h4 class="subtitle-1 grey--text">{{ selected_restaurant.restaurant.location.address }}</h4>

        <v-container class="pl-0 pb-0">
          <template v-if="selected_restaurant.restaurant.has_table_booking">
            <v-icon color="green" class="mr-2">mdi-check</v-icon>Bookings
          </template>
          <template v-else>
            <v-icon color="red" class="mr-2">mdi-close</v-icon>No Bookings
          </template>
        </v-container>

        <v-container class="pl-0 pt-0">
          <template v-if="selected_restaurant.restaurant.has_online_delivery">
            <v-icon color="green" class="mr-2">mdi-check</v-icon>Delivery available
          </template>
          <template v-else>
            <v-icon color="red" class="mr-2">mdi-close</v-icon>Delivery not available
          </template>
        </v-container>

        <p class="subtitle-2 mb-0 font-weight-bold">CUISINES</p>
        <p class="text-h5 font-weight-light">{{selected_restaurant.restaurant.cuisines}}</p>

        <p class="subtitle-2  mb-0 font-weight-bold">PHONE NUMBER</p>
        <p class="text-h5 font-weight-light">{{selected_restaurant.restaurant.phone_numbers}}</p>

        <p class="subtitle-2  mb-0 font-weight-bold">OPENING HOURS</p>
        <p class="text-h5 font-weight-light">{{selected_restaurant.restaurant.timings}}</p>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'RestaurantDetails',

  computed: {
    ...mapGetters({
      selected_restaurant : 'getSelectedRestaurant',
    }),

  },

}
</script>

<style>
</style>
