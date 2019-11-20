<template>
  <div class="home">
    <TopBar />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'home',
  components: {
    TopBar,
  },
};
</script>
