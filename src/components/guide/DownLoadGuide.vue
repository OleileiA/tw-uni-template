<template>
  <view class="flex-wrapper-between w-full h-15d5 px-std bg-white box-border">
    <view
      class="flex-none w-11d25 h-11d25 overflow-hidden"
      :class="[customAvatar]"
    >
      <image class="w-full h-full" :src="avatar"></image>
    </view>
    <view class="flex-auto pl-2">
      <view class="text-gray-700 font-semibold text-base line1-overflow">{{
        nickname
      }}</view>
      <view class="text-gray-400 text-sm line1-overflow">{{ desc }}</view>
    </view>
    <view
      @click="clickOpenNow"
      class="flex-none w-21d5 h-8d5 text-gray-200 text-base text-center leading-8 bg-theme rounded-4xl"
    >
      立即打开
    </view>
  </view>
</template>
<script>
export default {
  props: {
    avatar: String,
    nickname: String,
    desc: String,
    customAvatar: {
      type: String,
      default: "rounded-full",
    },
  },
  methods: {
    clickOpenNow() {
      this.$emit("clickOpenNow");
    },
  },
};
</script>
