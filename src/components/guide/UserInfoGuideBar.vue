<template>
  <view
    class="relative flex-wrapper-between w-full h-16d25 p-std bg-white bg-opacity-20 box-border rounded-md"
  >
    <slot name="user-info-slot"></slot>
    <view
      class="relative flex-none w-11d25 h-11d25 rounded-full overflow-hidden"
    >
      <image class="w-11d25 h-11d25" :src="avatar"></image>
    </view>
    <view class="flex-auto w-0 pl-std line1-overflow">
      <view class="text-white text-lg font-semibold">{{ nickname }}</view>
      <view class="text-gray-200 text-sm">
        <text>粉丝 {{ fans }}</text>
        <text class="pl-5">作品 {{ works }}</text>
      </view>
    </view>
    <view class="flex-none">
      <view v-if="followed" @click="clickFollowBtn"
        class="w-18d75 h-7 text-gray-400 text-base text-center leading-7 bg-gray-100 rounded-4xl"
        >已关注</view>
      <view v-else @click="clickFollowBtn"
            class="w-18d75 h-7 text-white text-base text-center leading-7 bg-theme rounded-4xl"
      >关注</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    avatar: String,
    nickname: String,
    fans: Number,
    works: Number,
    followed: Boolean,
  },
  methods: {
    clickFollowBtn() {
      this.$emit("clickFollow");
    },
  },
};
</script>
