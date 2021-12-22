<template>
  <layout v-if="show">
    <template slot="content">
      <image
        class="absolute m-0 top-10 right-10 w-40 h-60"
        src="../../static/images/shareGuide.png"
      ></image>
    </template>
  </layout>
</template>
<script>
import Layout from "../common/Layout";

export default {
  components: {
    Layout,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
