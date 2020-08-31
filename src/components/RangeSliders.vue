<template>
  <v-container>
    <p class="subtitle-2 ml-1 mb-2">RATING</p>
    <v-row no-gutters>
      <v-range-slider
          :tick-labels="['0','1','2','3','4','5']"
          :value="[1, 4]"
          min="0"
          max="5"
          color="accent"
          track-color="gray"
      >
      </v-range-slider>
    </v-row>

    <p class="subtitle-2 ml-1 mb-2">COST</p>
    <v-row no-gutters>
      <v-range-slider
          :tick-labels="['$','$$','$$$', '$$$$']"
          :value="[1, 3]"
          min="0"
          max="3"
          color="accent"
          track-color="gray"
      >
      </v-range-slider>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'RangeSliders',

  data: () => ({

  }),

  computed: {

  },

  mounted () {
  }
}
</script>

<style>
</style>
