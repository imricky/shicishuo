<template>
  <div class="home">
<!--    <TopBar />-->
<!--    <DailyPoem />-->
<!--    <ExploreGoodPoetry />-->
    <library />
<!--    <Footer />-->
  </div>
</template>

<script>
// @ is an alias to /src
// import TopBar from '@/components/TopBar.vue';
// import DailyPoem from '@/components/DailyPoem.vue';
// import ExploreGoodPoetry from '@/components/ExploreGoodPoetry.vue';
// import Footer from '@/components/Footer.vue';
import Library from '@/components/Library.vue';

export default {
  name: 'home',
  components: {
    // TopBar,
    // DailyPoem,
    // ExploreGoodPoetry,
    Library,
    // Footer,
  },
};
</script>

<style>

</style>
