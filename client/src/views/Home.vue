<template>
  <div class="home">
    <TopBar />
<!--    <DailyPoem />-->
<!--    <ExploreGoodPoetry />-->
<!--    <library />-->
<!--    <CoolExploration />-->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue';
// import DailyPoem from '@/components/DailyPoem.vue';
// import ExploreGoodPoetry from '@/views/poem/ExploreGoodPoetry.vue';
import Footer from '@/components/Footer.vue';
// import Library from '@/components/Library.vue';
// import CoolExploration from '@/components/CoolExploration.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    // DailyPoem,
    // ExploreGoodPoetry,
    // Library,
    // CoolExploration,
    Footer,
  },
};
</script>

<style>

</style>
