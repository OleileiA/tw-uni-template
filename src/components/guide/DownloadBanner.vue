<template>
  <view class="flex-wrapper-center h-14 text-base" :style="{ color: color }" @click="clickBanner">
    <view>{{desc}}</view>
    <u-icon name="arrow-right" :color="color"></u-icon>
  </view>
</template>
<script>
import uIcon from 'uview-ui/components/u-icon/u-icon';
export default {
  components: {
    uIcon
  },
  props: {
    desc: String,
    color: String
  },
  methods: {
    clickBanner() {
      this.$emit("clickBanner");
    }
  }
}
</script>
