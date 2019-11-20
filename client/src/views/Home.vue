<template>
  <div class="home">
    <TopBar />
    <DailyPoem />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue';
import DailyPoem from '@/components/DailyPoem.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    DailyPoem,
  },
};
</script>

<style>

</style>
