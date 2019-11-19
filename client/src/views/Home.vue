<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TopBar />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    TopBar,
  },
};
</script>
