<template>
  <view class="card">
    <view class="cover relative rounded-md overflow-hidden">
      <slot name="cover"></slot>
      <image :src="cover" class="w-full h-full"></image>
    </view>
    <view class="pt-2 text-dark text-base line1-overflow">{{ title }}</view>
    <slot name="card-bottom"></slot>
  </view>
</template>
<script>
export default {
  props: {
    cover: String,
    title: String,
  },
};
</script>
<style scoped>
.card {
  width: 214rpx;
}
.cover {
  width: 214rpx;
  height: 214rpx;
}
</style>
