<template>
  <div class="home">
<!--    <TopBar />-->
<!--    <PoemCard :poemCardData="poemCardData"/>-->
<!--    <CoolExplorationCard />-->
<!--    <DailyPoem />-->
<!--    <ExploreGoodPoetry />-->
    <library />
<!--    <CoolExploration />-->
<!--    <Footer />-->
  </div>
</template>

<script>
// @ is an alias to /src
// import TopBar from '@/components/TopBar.vue';
// import PoemCard from '@/components/PoemCard.vue'; //诗词卡片
// import CoolExplorationCard from '@/components/CoolExplorationCard.vue';
// import DailyPoem from '@/components/DailyPoem.vue';
// import ExploreGoodPoetry from '@/views/poem/ExploreGoodPoetry.vue';
import Footer from '@/components/Footer.vue';
import Library from '@/views/poem/Library.vue';
// import CoolExploration from '@/views/poem/CoolExploration.vue';

export default {
  name: 'home',
  components: {
    // TopBar,
    // PoemCard,
    // CoolExplorationCard,
    // DailyPoem,
    // ExploreGoodPoetry,
    Library,
    // CoolExploration,
    // Footer,
  },
  data() {
    return {
      poemCardData: {
        title: 'testTitle',
        author: 'testAuthor',
        paragraphs: ['千山鸟飞绝，万径人踪灭。', '孤舟蓑笠翁，独钓寒江雪', '宝剑锋从磨砺出，梅花香自苦寒来', '接天莲叶无穷碧，映日荷花别样红'],
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
    };
  },
};
</script>

<style>

</style>
