<template>
  <div class="home">
    <TopBar />
<!--    <DailyPoem />-->
    <ExploreGoodPoetry />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue';
// import DailyPoem from '@/components/DailyPoem.vue';
import ExploreGoodPoetry from '@/components/ExploreGoodPoetry.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    // DailyPoem,
    ExploreGoodPoetry,
    Footer,
  },
};
</script>

<style>

</style>
