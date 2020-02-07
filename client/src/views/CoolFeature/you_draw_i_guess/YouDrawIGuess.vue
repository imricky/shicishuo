<template>
  <div>
    <TopBar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'YouDrawIGuess',
  components: {
    TopBar,
    Footer,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

</style>
