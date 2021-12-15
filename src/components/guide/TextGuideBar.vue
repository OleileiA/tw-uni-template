<template>
  <view class="flex-wrapper-center p-std text-base" :style="{ 'color': color }" @click="clickGuideBar">
    <view>{{text}}</view>
    <u-icon name="arrow-right" :color="color" size="16"></u-icon>
  </view>
</template>
<script>
import uIcon from 'uview-ui/components/u-icon/u-icon';
export default {
  props: {
    text: String,
    color: String,
    arrow: Boolean
  },
  components: {
    uIcon
  },
  methods: {
    clickGuideBar() {
      console.log('clickGuideBar');
      this.$emit("clickGuideBar");
    }
  }
}
</script>
