<template>
  <el-tag
    size="medium"
    effect="plain"
    :class="[activeClass, baseClass, space]"
    :type="buttonType"
    @click="clickTag(text)">
    {{ text }}
  </el-tag>
</template>

<script>
export default {
  name: 'TagButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    wordSpace: {
      type: Boolean,
    },
    // // tags的上下间距
    // marginUD: {
    //   type: Number,
    // },
    // // tags的左右间距
    // marginLR: {
    //   type: Number,
    // },
  },
  data() {
    return {
      activeClass: this.buttonType === 'primary' ? 'active-primary' : 'active-success',
      baseClass: 'tag-button',
      space: this.wordSpace ? 'space' : '',
    };
  },
  computed: {},
  methods: {
    clickTag(text) {
      this.$router.push({ path: `/tag/${text}` }); // -> /user/123
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .tag-button{
    cursor:pointer;
    margin: 5px 8px;
  }
  .active-success{
    &:hover{
      background-color: darken(#BBE3A9,5%);
    }
  }
  .active-primary{
    &:hover{
      background-color: darken(#B3D9FF,5%);;
    }
  }
  .space{
    margin: 10px 8px;
  }
</style>
