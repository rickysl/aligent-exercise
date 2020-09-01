<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="4">
        <categories></categories>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <cuisine></cuisine>
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <range-sliders></range-sliders>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import categories from './Categories'
import cuisine from './Cuisine'
import rangeSliders from './RangeSliders'

export default {
  name: 'Filters',

  components:{
    categories,
    cuisine,
    rangeSliders
  },
}
</script>

<style>
</style>
