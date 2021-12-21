<template>
  <view class="relative flex-wrapper-between w-full h-16d25 bg-grey-200">
    <view class="flex-auto flex-wrapper-between justify-items-start">
      <view class="flex-auto pl-1 pt-1d5">
        <image v-for="item in flowerSender.slice(0, 3)"
               :key="item.id"
               class="relative w-8 h-8 rounded-full ml-m1 img-border box-border"
               :src="item.avatarUrl"
        ></image>
      </view>
      <view class="flex-auto text-golden text-sm">已有{{flowerNum}}人赠送鲜花</view>
    </view>
    <view class="btn-border flex-none flex-wrapper-center w-30 h-10 text-base rounded-4xl box-border">
      <image class="flex-none w-5 h-5" src="../../static/images/flower.png"></image>
      <view class="pl-2 text-golden">我要送花</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    flowerSender: Array,
    flowerNum: Number,
  },
  methods: {},
};
</script>
<style scoped>
.btn-border {
  border: 0 solid;
  border-color: #FFCF57;
  @apply border-2;
}
.img-border {
  border: 0 solid;
  @apply border-2 border-white;
}
</style>
