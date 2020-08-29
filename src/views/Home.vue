<template>
  <div class="home">
    <v-img
        alt="Vue logo"
        src="../assets/logo.png"
        class="my-3"
        contain
        height="200"
    ></v-img>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
