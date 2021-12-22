<template>
  <view
    class="relative flex-wrapper-between flex-col w-13 h-65 text-dark text-3d5"
  >
    <view
      @click="clickGift"
      class="w-13 h-13 py-1 flex-wrapper-between flex-col bg-white rounded-full box-border"
    >
      <image
        class="flex-none w-6d5 h-6d5"
        src="../../static/images/gift.png"
      ></image>
      <view>礼物</view>
    </view>
    <view
      @click="clickComment"
      class="flex-none w-13 h-13 py-1 flex-wrapper-between flex-col bg-white rounded-full box-border"
    >
      <u-icon name="chat" size="30" color="#1B1B1C"></u-icon>
      <view class="relative top-m1">评论</view>
    </view>
    <view
      @click="clickPraise"
      class="flex-none w-13 h-13 py-1 flex-wrapper-between flex-col bg-white rounded-full box-border"
    >
      <u-icon name="thumb-up" size="30" color="#1B1B1C"></u-icon>
      <view class="relative top-m1">点赞</view>
    </view>
    <view
      @click="clickShare"
      class="flex-none w-13 h-13 py-1 flex-wrapper-between flex-col bg-white rounded-full box-border"
    >
      <u-icon name="share" size="30" color="#1B1B1C"></u-icon>
      <view class="relative top-m1">转发</view>
    </view>
  </view>
</template>
<script>
import uIcon from "uview-ui/components/u-icon/u-icon";

export default {
  components: {
    uIcon,
  },
  methods: {
    clickGift() {
      this.$emit("clickGift");
    },
    clickComment() {
      this.$emit("clickComment");
    },
    clickPraise() {
      this.$emit("clickPraise");
    },
    clickShare() {
      this.$emit("clickShare");
    },
  },
};
</script>
